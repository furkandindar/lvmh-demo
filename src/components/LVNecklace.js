import {React, useState} from 'react'
import "@google/model-viewer/dist/model-viewer";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

function Model3D(props){
    return <model-viewer 
    bounds="tight" 
    src="https://duz6y1s4uiy9h.cloudfront.net/LeMagnifiche.glb" 
    ar ar-modes="webxr scene-viewer quick-look" 
    camera-controls environment-image="https://duz6y1s4uiy9h.cloudfront.net/mix_hdr2.hdr" 
    poster="https://duz6y1s4uiy9h.cloudfront.net/le_magnifiche_poster.webp" 
    shadow-intensity="0.6" 
    exposure="2" 
    camera-orbit="-394deg 78.27deg 100%" 
    min-camera-orbit="auto auto 0.366m" 
    min-field-of-view="39.38deg"
    max-field-of-view="90deg"></model-viewer>
}

function LVNecklace() {
    let navigate = useNavigate();
    const [render8thWallIframe, setRender8thWallIframe] = useState(false);
    console.log(render8thWallIframe);
    let button;

    if(render8thWallIframe){
        button = <Button sx={{color: "#85715D"}} size="large" endIcon={<ViewInArIcon/>} onClick={() => {console.log("button clicked"); setRender8thWallIframe(!render8thWallIframe)}}>view</Button>
    }else{
        button = <Button sx={{color: "#85715D"}} size="large" onClick={() => {console.log("button clicked"); setRender8thWallIframe(!render8thWallIframe)}}>try-on</Button>
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
                <Paper style={{height:"75vh", width:"100%"}}>
                {render8thWallIframe ? <div>8thwall iframe here</div> : <Model3D/>}
                </Paper>
            </Grid>
            <Grid item container justifyContent="center"  xs={2}>
                {button}
            </Grid>
        </Grid>
    )
}

export default LVNecklace
