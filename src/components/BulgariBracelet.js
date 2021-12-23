import {React, useState} from 'react'
import "@google/model-viewer/dist/model-viewer";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
    typography: {
      fontFamily: [
        'jost',
      ].join(','),
    },
});

const Model = () => {
    const gltf = useLoader(GLTFLoader, "https://duz6y1s4uiy9h.cloudfront.net/Bulgari_bracelet__ThreeV3.glb");
    const modelRef = useRef();

    const model = gltf.scene;

    model.children[1].material.colorWrite = false;
    model.children[2].material.opacity = 0.2;
    console.log(model);

    useFrame((state, delta) => {
        modelRef.current.position.x = (landmark_x - 0.5)*10;
        modelRef.current.position.y = -(landmark_y - 0.45)*7.5;
        // modelRef.current.position.x = 0;
        // modelRef.current.position.y = 4;
        // modelRef.current.position.z = landmark_z;

        modelRef.current.scale.x = scale*58;
        modelRef.current.scale.y = scale*58;
        modelRef.current.scale.z = scale*58;

        // modelRef.current.rotation.y = Math.PI/2;
        // modelRef.current.rotation.x = Math.PI/2;

        if (hand_info === "Right") {
            modelRef.current.rotation.z = -(rotateZ) + Math.PI/2;
            if (rotateY > 0) {
                modelRef.current.rotation.y = rotateY - Math.PI/16;
              } else {
                modelRef.current.rotation.y = rotateY + Math.PI - Math.PI/16;
              }
        } else {
            modelRef.current.rotation.z = -(rotateZ) + Math.PI/2;
            if (rotateY < 0) {
                modelRef.current.rotation.y = rotateY + Math.PI/16;
              } else {
                modelRef.current.rotation.y = rotateY + Math.PI + Math.PI/16;
              }
        }

    });

    return (
      <>
        <primitive ref={modelRef} object={gltf.scene} scale={5} />
      </>
    );
};

var landmark_x = -100;
var landmark_y = -100;
var landmark_z = -100;
var scale = 0;
var rotateZ = 0;
var rotateY = 0;
var rotateX = 0;
var hand_info = null;

function Model3D(props){
    return <model-viewer src="https://duz6y1s4uiy9h.cloudfront.net/Bulgari_bracelet_MV_V5.glb"
    environment-image="https://duz6y1s4uiy9h.cloudfront.net/dresden_square_1k.hdr"
    poster="https://duz6y1s4uiy9h.cloudfront.net/bulgari_bracelet_poster_v3.webp"
    ar ar-modes="webxr scene-viewer quick-look"
    bounds="tight"
    shadow-intensity="1"
    exposure="1.6" 
    camera-orbit="-41.28deg 45.71deg auto"
    max-field-of-view="90deg"
    min-field-of-view="60deg"
    camera-controls></model-viewer>;
}

function WristTracking(props){
    const webcamRef = useRef(null);
    var camera = null;

    function onResults(results){
        //console.log(results);
        //console.log(webcamRef.current);
        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                hand_info = results.multiHandedness[0].label;
                //console.log(hand_info);
                landmark_x = landmarks[0].x;
                landmark_y = landmarks[0].y;
                landmark_z = landmarks[0].z;

                // console.log(landmarks[1].x);
                // console.log(landmarks[1].z);
                //console.log("landmark z: " + landmarks[0].z);

                scale = Math.sqrt((landmarks[9].x - landmarks[0].x)**2 + (landmarks[9].y - landmarks[0].y)**2 + (landmarks[9].z - landmarks[0].z)**2);
                //scale = Math.abs();
                //console.log(scale);

                rotateZ = Math.atan((landmarks[9].y - landmarks[0].y)/(landmarks[9].x - landmarks[0].x));
                rotateY = Math.atan((landmarks[5].z - landmarks[17].z)/(landmarks[5].x - landmarks[17].x));
                //console.log(rotateY);
            }
        }
        else{
            landmark_x = -100;
            landmark_y = -100;
            landmark_z = -100;
        }
    }

    useEffect(() => {
        const hands = new Hands({
            locateFile:(file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
              }
        });

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
            selfieMode: true,
        });

        hands.onResults(onResults);
        //console.log(webcamRef.current);
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async()=>{
                    //console.log("besiktas");
                  await hands.send({image:webcamRef.current.video});
                },
            },);
            //console.log("webcam var");
            camera.start();
            // setTimeout(() => {
            //     navigate("/");
            // }, 1000);
        }
    });

    return (
            <div className="outer-div">
            <Webcam className="webcam-wrapper"  ref={webcamRef} mirrored={true}></Webcam>
            <Canvas className="canvas-wrapper">
                <Suspense fallback={null}>
                    <Model></Model>
                    <Environment files="https://duz6y1s4uiy9h.cloudfront.net/dresden_square_1k.hdr"></Environment>
                    <OrbitControls></OrbitControls>
                </Suspense>
            </Canvas>
        </div>
    );
}

function BulgariBracelet() {
    let navigate = useNavigate();
    const [renderWristTracking, setRenderWristTracking] = useState(false);
    let button;
    const themeResponsive = useTheme();
    const isMobile = !useMediaQuery(themeResponsive.breakpoints.up('sm'));

  //onClick={() => {setRenderWristTracking(!renderWristTracking)}}

    if(renderWristTracking){
        button = <a href="#" class="fancy-button bg-gradient1" onClick={() => {setRenderWristTracking(!renderWristTracking)}}><span><img src="./viewinar_01.png"/>See in your space</span></a>
    }else{
        if(isMobile){
            button = <a href="https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=ea42f6c40d024548a2c2b96a4d336d43&metadata=01" class="fancy-button bg-gradient3"><span><img src="./snap_01.png"/>TRY ON</span></a>
        }else{
            button = <a href="#" class="fancy-button bg-gradient3" onClick={() => {setRenderWristTracking(!renderWristTracking)}}><span><img src="./snap_01.png"/>TRY ON</span></a>
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                >
                <Grid item xs={2}>
                    <Button disableRipple={true} sx={{color: "#4f464b", "&.MuiButtonBase-root:hover": {bgcolor: "transparent"}}} size="large" startIcon={<ArrowBackIosNewIcon/>} onClick={() => {navigate("/");}}>Products</Button>
                </Grid>
                <Grid item xs={8}>
                    <Paper style={{height:"70vh", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", overflowY:"hidden", overflowX:"hidden"}}>
                        {renderWristTracking ? <WristTracking renderWristTracking={renderWristTracking}/> : <Model3D/>}
                    </Paper>
                </Grid>
                <Grid item container justifyContent="center"  xs={2}>
                    {button}
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default BulgariBracelet
