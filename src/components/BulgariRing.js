import {React, useState} from 'react'
import "@google/model-viewer/dist/model-viewer";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

import { useRef, useEffect, Suspense } from "react";
import Webcam from "react-webcam";
import { Hands } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment, OrbitControls, Html, useProgress } from "@react-three/drei";
import "../components/trackingStyles.css";

import { createTheme, ThemeProvider} from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const theme = createTheme({
    typography: {
      fontFamily: [
        'jost',
      ].join(','),
    },
});

const Model = () => {
    //https://duz6y1s4uiy9h.cloudfront.net/RingTransformed.glb
    const gltf = useLoader(GLTFLoader, "https://duz6y1s4uiy9h.cloudfront.net/Bvlgari_B.zero1_Ring_occluder.glb");

    const ref = useRef();
    const mesh = gltf.scene;
  
    
  
    mesh.children[0].material.colorWrite = false;
    console.log(mesh);
  
    useFrame((state, delta) => {
      //console.log(gltf.scene);
      
      ref.current.position.x = (landmark_x - 0.5);
      ref.current.position.y = -(landmark_y - 0.52)*0.75;
      //ref.current.position.z = -1;
      ref.current.rotation.z = -(rotateZ);
      ref.current.rotation.x = rotateX + Math.PI/2;
      if (hand_info === "Left") {
        if (rotateY < 0) {
          ref.current.rotation.y = rotateY;
        } else {
          ref.current.rotation.y = rotateY + Math.PI;
        }
      } else {
        if (rotateY > 0) {
          ref.current.rotation.y = rotateY - Math.PI/16;
        } else {
          ref.current.rotation.y = rotateY + Math.PI - Math.PI/16;
        }
      }
      ref.current.scale.x = scale*10;
      ref.current.scale.y = scale*10;
      ref.current.scale.z = scale*10;
    })
  
    return (
      <>
        <primitive ref={ref} object={gltf.scene} scale={5}></primitive>
      </>
    );
  };

var landmark_x = -100;
var landmark_y = -100;
var landmark_z = -100;
var scale_x = 0.1;
var scale_y = 0.1;
var scale_z = 0.1;
var scale = 0.1;
var rotateZ = 0;
var rotateY = 0;
var rotateX = 0;
var hand_info = null;

function Model3D(props){
    return <model-viewer 
    src="https://duz6y1s4uiy9h.cloudfront.net/Bvlgari_B.zero1_Ring_final_version.glb"
    poster="./Bulgari_logo_01.png"
    environment-image="https://duz6y1s4uiy9h.cloudfront.net/mix_hdr2.hdr" 
    ar-modes="quick-look"
    ar-scale 
    shadow-intensity="1" 
    exposure="2" 
    max-field-of-view="90deg" 
    min-camera-orbit="auto auto 0.04054m" 
    min-field-of-view="90deg" 
    camera-orbit="-136.1deg 60.04deg auto"
    camera-controls></model-viewer>;
}

function RingTracking(props){
  const canvasRef= useRef(null);
  console.log(canvasRef);
    const webcamRef = useRef(null);
  var camera = null;
  const [showHand, setshowHand] = useState(true);

  function onResults(results){
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        //console.log(landmarks[0]);
        if (landmarks[14].x !== "undefined") {
          landmark_x = (landmarks[14].x + landmarks[13].x)/2;
          landmark_y = (landmarks[14].y + landmarks[13].y)/2;
          landmark_z = (landmarks[14].z + landmarks[13].z)/2;
          //console.log(landmark_z);
          scale_x = landmarks[13].x - landmarks[14].x;
          scale_y = landmarks[13].y - landmarks[14].y;
          scale_z = landmarks[13].z - landmarks[14].z;
          //calculate the distance between landmarks[13] and [14]
          scale = Math.sqrt((landmarks[14].x- landmarks[13].x)**2 + (landmarks[14].y- landmarks[13].y)**2 + (landmarks[14].z- landmarks[13].z)**2);
          
          rotateZ = Math.atan((landmarks[14].y - landmarks[13].y)/(landmarks[14].x - landmarks[13].x));
          rotateX = Math.atan((landmarks[14].y - landmarks[13].y)/(Math.abs(landmarks[14].z - landmarks[13].z)));
          rotateY = Math.atan((landmarks[9].z - landmarks[13].z)/(landmarks[9].x - landmarks[13].x));

          hand_info = results.multiHandedness[0].label;
          //console.log(rotateX);

        }
      }
    }else{
        landmark_x = -100;
        landmark_y = -100;
        landmark_z = -100;
    }
    //console.log(results);
    if(results.multiHandLandmarks.length > 0){
        setshowHand(false);
    }else{
        setshowHand(true);
    }
  }

  useEffect(() => {
    const hands = new Hands({
      locateFile:(file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    })

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: true,
      
    })

    hands.onResults(onResults);

    if(typeof webcamRef.current !== "undefined" && webcamRef.current !== null){
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async()=>{
          await hands.send({image:webcamRef.current.video})
        },
        //width: 640,
        //height: 480,
      })

      camera.start();
    }

    

  })
  function closeCamera(){
      console.log("camera closing");
      camera.stop();
      const video = document.querySelector('video');

      const mediaStream = video.srcObject;
      const tracks = mediaStream.getTracks();
      tracks[0].stop();
  }
  return (
        <div className="outer-div">
        {/* {showHand ? <div className="webcam-wrapper" style={{zIndex:100}}>
                <h1>SHOW YOUR HAND</h1>
        </div> : null} */}
          <Webcam className="webcam-wrapper" ref={webcamRef} mirrored={true} style={{borderRadius:"30px"}}/>
          <Canvas toneMappingExposure={2} ref={canvasRef} camera={{fov:75, position: [0, 0, 0.5] }} className="canvas-wrapper">
            <Suspense fallback={null}>
              <Model position={[0,0,0]}/>
              <Environment files="https://duz6y1s4uiy9h.cloudfront.net/mix_hdri_exp2.hdr"></Environment>
              <OrbitControls></OrbitControls>
            </Suspense>
          </Canvas>
        </div>
  );
}

function BulgariRing() {
    let navigate = useNavigate();
    const [renderRingTracking, setRenderRingTracking] = useState(false);
    let button;
    const themeResponsive = useTheme();
    const isMobile = !useMediaQuery(themeResponsive.breakpoints.up('sm'));

    if(renderRingTracking){
      button = <a href="#" class="fancy-button bg-gradient1" onClick={() => {setRenderRingTracking(!renderRingTracking)}}><span class="span2"><img class="img2" src="./close.png"/></span></a>
  }else{
      if(isMobile){
          button = <a href="https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=d29d37705add48779b9c711c25445fb7&metadata=01" class="fancy-button bg-gradient3"><span><img src="./snap_01.png"/>TRY ON</span></a>
      }else{
          button = <a href="#" class="fancy-button bg-gradient3" onClick={() => {setRenderRingTracking(!renderRingTracking)}}><span><img src="./viewinar_01.png"/>TRY ON</span></a>
      }
  }

  function viewInArButton(){
    var mv = document.getElementById("arbutton");
    mv.click();
  }

    return (
      <ThemeProvider theme={theme}>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            sx={{marginTop:"-7vmin"}}
            >
            <Grid item xs={2}>
            <Button disableRipple={true} sx={{color: "#4f464b", "&.MuiButtonBase-root:hover": {bgcolor: "transparent"}}} size="large" startIcon={<ArrowBackIosNewIcon/>} onClick={() => {navigate("/");}}>Catalog</Button>
            </Grid>
            <Grid item xs={8}>
            <Paper sx={{borderRadius:"50px", background:"transparent"}} style={{height:"65vh", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", overflowY:"hidden", overflowX:"hidden"}} elevation={0}>
                    {renderRingTracking ? <RingTracking stopCamera={!renderRingTracking}/> : <Model3D/>}
                </Paper>
            </Grid>
            <Grid item container justifyContent="center"  xs={2}>
              {button}
                {isMobile ? <a onClick={viewInArButton} class="fancy-button bg-gradient1"><span><img className="seeinyourspace" src="./seeinyourspace.png"/>View in your space</span></a> : null}
                    <a id="arbutton" href="https://duz6y1s4uiy9h.cloudfront.net/Bvlgari_B_v2_Test1.usdz" style={{display:"none"}} rel="ar"> <img /></a>
            </Grid>
        </Grid>
      </ThemeProvider>
    )
}

export default BulgariRing
