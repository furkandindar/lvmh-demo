import React from 'react'
import "@google/model-viewer/dist/model-viewer";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function LVEarrings() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={10}
            >
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Paper style={{height:"50vh", width:"100%"}}>
                    <model-viewer src="https://ttb-dev.s3.amazonaws.com/LV_Earrings.glb" environment-image="neutral" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls></model-viewer>
                </Paper>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}

export default LVEarrings
