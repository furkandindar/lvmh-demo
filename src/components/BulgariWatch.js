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

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

const Model = () => {
    const gltf = useLoader(GLTFLoader, "https://ttb-dev.s3.amazonaws.com/LV_watch_transformed_v1.glb");
    const modelRef = useRef();

    const model = gltf.scene;

    model.children[1].material.colorWrite = false;
    // model.children[2].material.colorWrite = false;
    //console.log(model);

    useFrame((state, delta) => {
        modelRef.current.position.x = (landmark_x - 0.5)*10;
        modelRef.current.position.y = -(landmark_y - 0.45)*7.5;
        // modelRef.current.position.x = 0;
        // modelRef.current.position.y = 4;
        // modelRef.current.position.z = landmark_z;

        modelRef.current.scale.x = scale*50;
        modelRef.current.scale.y = scale*50;
        modelRef.current.scale.z = scale*50;

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
            modelRef.current.rotation.z = (rotateZ) + Math.PI/2;
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
    return <model-viewer
       src="https://ttb-dev.s3.amazonaws.com/LV_Watch_web_Occluderless.glb"
       ios-src="https://ttb-dev.s3.amazonaws.com/Bvlgari_Web_V6.usdz"
       camera-orbit="0deg 15deg 105%"
       min-camera-orbit="auto 0deg auto"
       max-camera-orbit="auto 180deg auto"
       max-field-of-view="90deg"
       min-field-of-view="0deg"
       environment-image="neutral" 
       ar ar-modes="webxr scene-viewer quick-look"
       seamless-poster 
       shadow-intensity="1" 
       camera-controls>
       </model-viewer>;
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
        console.log(webcamRef.current);
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
                <Suspense fallback={<Loader/>}>
                    <Model></Model>
                    <Environment preset="sunset"></Environment>
                    <OrbitControls></OrbitControls>
                </Suspense>
            </Canvas>
            {/* <button onClick={() => { webcamRef.current = "undefined"; setTimeout(() => {
                const video = document.querySelector('video');

                const mediaStream = video.srcObject;

                const tracks = mediaStream.getTracks();

                tracks[0].stop();
                landmark_x = -100;
                landmark_y = -100;
                landmark_z = -100;
                navigate("/");
            }, 500);}}>Go back</button> */}
        </div>
    );
}

function BulgariWatch() {
    let navigate = useNavigate();
    const [renderWristTracking, setRenderWristTracking] = useState(false);
    console.log(renderWristTracking);
    let button;

    if(renderWristTracking){
        button = <Button sx={{color: "#85715D"}} size="large" endIcon={<ViewInArIcon/>} onClick={() => {console.log("button clicked"); setRenderWristTracking(!renderWristTracking)}}>view</Button>
    }else{
        button = <Button sx={{color: "#85715D"}} size="large" onClick={() => {console.log("button clicked"); setRenderWristTracking(!renderWristTracking)}}>try-on</Button>
    }
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            >
            <Grid item xs={2}>
                <Button sx={{color: "#85715D"}} size="large" startIcon={<ArrowBackIosNewIcon/>} onClick={() => {navigate("/");}}>Products</Button>
            </Grid>
            <Grid item xs={8}>
                <Paper style={{height:"60vh", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", overflowY:"hidden", overflowX:"hidden"}}>
                    {renderWristTracking ? <WristTracking renderWristTracking={renderWristTracking}/> : <Model3D/>}
                </Paper>
            </Grid>
            <Grid item container justifyContent="center"  xs={2}>
                {button}
            </Grid>
        </Grid>
    )
}

export default BulgariWatch
