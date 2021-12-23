import {React, useState} from 'react'
import "@google/model-viewer/dist/model-viewer";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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

function Model3D(props){
    return <model-viewer 
    bounds="tight" 
    src="https://duz6y1s4uiy9h.cloudfront.net/Viper_Necklece_02_1.glb" 
    ar-modes="quick-look"
    ar-scale
    camera-controls poster="./Bulgari_logo_01.png" 
    shadow-intensity="1" 
    exposure="1.1" 
    camera-target="0m 0m 0m"
    camera-orbit="412.3deg 71.46deg 50%" 
    environment-image="https://duz6y1s4uiy9h.cloudfront.net/dresden_square_1k.hdr" 
    min-camera-orbit="auto auto 0.1082m" 
    min-field-of-view="10deg"></model-viewer>
}

function LVViperNecklace() {
    let navigate = useNavigate();
    const [render8thWallIframe, setrender8thWallIframe] = useState(false);
    let button;
    const themeResponsive = useTheme();
    const isMobile = !useMediaQuery(themeResponsive.breakpoints.up('sm'));

    if(render8thWallIframe){
        button = <a href="#" class="fancy-button bg-gradient1" onClick={() => {console.log("button clicked"); setrender8thWallIframe(!render8thWallIframe)}}><span class="span2"><img class="img2" src="./close.png"/></span></a>
    }else{
        button = <a href="#" class="fancy-button bg-gradient3" onClick={() => {console.log("button clicked"); setrender8thWallIframe(!render8thWallIframe)}}><span><img src="./viewinar_01.png"/>TRY ON</span></a>
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
            >
            <Grid item xs={2}>
            <Button disableRipple={true} sx={{color: "#4f464b", "&.MuiButtonBase-root:hover": {bgcolor: "transparent"}}} size="large" startIcon={<ArrowBackIosNewIcon/>} onClick={() => {navigate("/");}}>Catalog</Button>
            </Grid>
            <Grid item xs={8}>
            <Paper sx={{borderRadius:"50px", background:"transparent"}} style={{height:"70vh", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", overflowY:"hidden", overflowX:"hidden"}} elevation={0}>
                {render8thWallIframe ? <iframe style={{width:"100%", height:"100%", border:"none"}} allow="camera;microphone;gyroscope;accelerometer;xr-spatial-tracking;" src="https://qreal3d.8thwall.app/viper-necklace/"></iframe> : <Model3D/>}
                </Paper>
            </Grid>
            <Grid item container justifyContent="center"  xs={2}>
                {button}
                {isMobile ? <a href="#" class="fancy-button bg-gradient3"><span><img src="./snap_01.png"/>TRY ON</span></a> : null}
                {isMobile ? <a onClick={viewInArButton} class="fancy-button bg-gradient1"><span><img className="seeinyourspace" src="./seeinyourspace.png"/>View in your space</span></a> : null}
                    <a id="arbutton" href="https://duz6y1s4uiy9h.cloudfront.net/Bvlgari_Web_V6.usdz" style={{display:"none"}} rel="ar"> <img /></a>
            </Grid>
        </Grid>
        </ThemeProvider>
    )
}

export default LVViperNecklace
