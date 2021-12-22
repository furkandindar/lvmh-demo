import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import {useNavigate} from "react-router-dom";
import { createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
    typography: {
      fontFamily: [
        'jost',
      ].join(','),
    },});

function ProductCard(props) {
    const {name, imgUrl, alt, linkTo} = props;
    let navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <Card onClick={() => {navigate(linkTo);}} sx={{border:"1px solid #4f464b", boxShadow:"none", background:"transparent"}}>
                <CardMedia
                    component="img"
                    alt={alt}
                    image={imgUrl}
                />
                <CardContent style={{textAlign:"center", paddingLeft:0, paddingRight:0}}>
                    <Typography variant="subtitle1" component="div">
                    {name}
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent:"center"}}>
                </CardActions>
        </Card>
        </ThemeProvider>
    )
}

export default ProductCard

