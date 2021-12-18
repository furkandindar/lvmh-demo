import React from 'react'
import ProductCard from "./ProductCard"
import { Grid } from '@mui/material'
import productList from "../product_info";

function Content() {

    const getProductInfo = (productInfo) => {
        return (
            <Grid item xs={12} md={6} lg={4}>
                <ProductCard {...productInfo}/>
            </Grid>
        )
    }
    return (
        <Grid container spacing={5}>
                {productList.map(productInfo => getProductInfo(productInfo))}
        </Grid>
    )
}

export default Content
