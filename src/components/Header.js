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
                    size="large"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => {navigate("/");}}
                >
                   <img style={{width:"100%", maxWidth:"325px"}} src="./The-LAB-BVLGARI-QREAL.png"></img>
                </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
