import React from 'react'
import "@google/model-viewer/dist/model-viewer";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

function ModelViewer() {
    let navigate = useNavigate();
    return (
        <Grid container rowSpacing={10} columnSpacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={10} sm={10} md={10} lg={8} xl={6} style={{height:"50vh"}}>
              <Paper elevation={3} style={{width:"100%", height:"100%", textAlign:"center"}}>
                <model-viewer src="./assets/model-glb/NECKLACE.glb" environment-image="neutral" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls></model-viewer>
                <Button variant="outlined" onClick={() => {navigate("/lv_necklace")}}>Try-On</Button>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={8} xl={6} style={{height:"50vh"}}>
              <Paper elevation={3} style={{width:"100%", height:"100%", textAlign:"center"}}>
                <model-viewer src="./assets/model-glb/LV_Watch_web_Occluderless.glb" environment-image="neutral" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls></model-viewer>
                <Button variant="outlined" onClick={() => {navigate("/bulgari_watch")}}>Try-On</Button>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={8} xl={6} style={{height:"50vh"}}>
              <Paper elevation={3} style={{width:"100%", height:"100%", textAlign:"center"}}>
                <model-viewer src="./assets/model-glb/LV_Viper_Necklece.glb" environment-image="neutral" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls></model-viewer>
                <Button variant="outlined" onClick={() => {navigate("/lv_viper_necklace")}}>Try-On</Button>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={8} xl={6} style={{height:"50vh"}}>
              <Paper elevation={3} style={{width:"100%", height:"100%", textAlign:"center"}}>
                <model-viewer src="./assets/model-glb/LV_Earrings.glb" environment-image="neutral" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls></model-viewer>
                <Button variant="outlined" onClick={() => {navigate("/lv_earrings")}}>Try-On</Button>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={8} xl={6} style={{height:"50vh"}}>
              <Paper elevation={3} style={{width:"100%", height:"100%", textAlign:"center"}}>
                <model-viewer src="./assets/model-glb/Bulgari_Ring_V2.glb" environment-image="neutral" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls></model-viewer>
                <Button variant="outlined" onClick={() => {navigate("/bulgari_ring")}}>Try-On</Button>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={8} xl={6} style={{height:"50vh"}}>
              <Paper elevation={3} style={{width:"100%", height:"100%", textAlign:"center"}}>
                <model-viewer src="./assets/model-glb/Bulgari_bracelet_V7.glb" environment-image="neutral" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls></model-viewer>
                <Button variant="outlined" onClick={() => {navigate("/bulgari_bracelet")}}>Try-On</Button>
              </Paper>
            </Grid>
      </Grid>
    )
}

export default ModelViewer
