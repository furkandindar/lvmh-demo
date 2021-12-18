import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

function ProductCard(props) {
    const {name, imgUrl, alt} = props;
    return (
        <Card>
                <CardMedia
                    component="img"
                    alt={alt}
                    image={imgUrl}
                />
                <CardContent style={{textAlign:"center", padding:0}}>
                    <Typography variant="subtitle1" component="div">
                    {name}
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent:"center"}}>
                    <Button sx={{color: "#85715D"}} size="large" endIcon={<ViewInArIcon/>}>View</Button>
                </CardActions>
        </Card>
    )
}

export default ProductCard

