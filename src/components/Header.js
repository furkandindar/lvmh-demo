import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from "react-router-dom";

function Header() {
    let navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar style={{padding:0}}>
                <IconButton
                    disableRipple={true}
                    size="large"
                    edge="start"
                    aria-label="menu"
                    sx={{ paddingTop:0, paddingBottom:0, mr: 2, "&.MuiButtonBase-root:hover": {bgcolor: "transparent"}, "&.MuiTouchRipple-root:active": {bgcolor: "transparent"} }}
                    onClick={() => {navigate("/");}}
                >
                   <img style={{width:"100%", maxWidth:"310px", marginTop:"8vmin", marginBottom:"8vmin"}} src="./The-LAB-x-Bulgari-x-QReal_v4.png" alt="qreal_lvmh"></img>
                </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
