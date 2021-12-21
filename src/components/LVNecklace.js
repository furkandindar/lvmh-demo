import React from 'react'
import "@google/model-viewer/dist/model-viewer";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function LVNecklace() {
    let navigate = useNavigate();
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
                <Paper style={{height:"80vh", width:"100%"}}>
                    {/* <model-viewer src="https://ttb-dev.s3.amazonaws.com/NECKLACE.glb" bounds="tight" ar ar-modes="webxr scene-viewer quick-look" camera-controls environment-image="neutral" shadow-intensity="1"></model-viewer> */}
                    <model-viewer bounds="tight" src="../assets/model-glb/LeMagnifiche.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls environment-image="../assets/model-glb/waterbuck_trail_1k.hdr" shadow-intensity="1"></model-viewer>
                </Paper>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}

export default LVNecklace
