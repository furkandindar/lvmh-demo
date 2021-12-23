import {React, useState} from 'react'
import "@google/model-viewer/dist/model-viewer";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "../components/trackingStyles.css";
import { createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
    typography: {
      fontFamily: [
        'jost',
      ].join(','),
    },
});

function Model3D(props){
    return <model-viewer
    bounds="tight" 
    src="https://duz6y1s4uiy9h.cloudfront.net/Earrings_v03.glb" 
    ar ar-modes="webxr scene-viewer quick-look" 
    camera-controls 
    environment-image="https://duz6y1s4uiy9h.cloudfront.net/dresden_square_1k.hdr" 
    poster="https://duz6y1s4uiy9h.cloudfront.net/serpenti_earrings.webp" 
    shadow-intensity="1" 
    camera-orbit="-36.88deg 59.91deg auto"
    max-field-of-view="90deg"
    ></model-viewer>
}

function LVEarrings() {
    let navigate = useNavigate();
    const [render8thWallIframe, setRender8thWallIframe] = useState(false);
    console.log(render8thWallIframe);
    let button;

    if(render8thWallIframe){
        button = <a href="#" class="fancy-button bg-gradient1" onClick={() => {console.log("button clicked"); setRender8thWallIframe(!render8thWallIframe)}}><span><img src="./viewinar_01.png"/>See in your space</span></a>
    }else{
        button = <a href="#" class="fancy-button bg-gradient3" onClick={() => {console.log("button clicked"); setRender8thWallIframe(!render8thWallIframe)}}><span><img src="./snap_01.png"/>TRY ON</span></a>
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
                <Paper style={{height:"70vh", width:"100%"}}>
                    {render8thWallIframe ? <iframe style={{width:"100%", height:"100%"}} allow="camera;microphone;gyroscope;accelerometer;xr-spatial-tracking;" src="https://qreal3d.8thwall.app/lvmh/"></iframe> : <Model3D/>}
                </Paper>
            </Grid>
            <Grid item container justifyContent="center"  xs={2}>
                {button}
            </Grid>
        </Grid>
        </ThemeProvider>
    )
}

export default LVEarrings
