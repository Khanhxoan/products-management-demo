import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import HeaderPages from "@/components/HeaderPages";
import ProductDetailComponent from "@/components/products/product-detail/ProductDetailComponent";
import { TITLE_PAGES } from "@/constants/contants";
import { getProductDetailThunk } from "@/stores/productSlice/productSlice";
import { Grid2 } from "@mui/material";

const ProductDetailPage = () => {
    const { productDetail } = useSelector((state) => state.products);
    const { productId } = useParams();
    const dispactch = useDispatch();

    useEffect(() => {
        if (!productDetail._id || productDetail._id !== productId) {
            dispactch(getProductDetailThunk(productId));
        }
    }, [productDetail, productId]);

    return (
        <Grid2
            direction="row"
            container
            spacing={2}
            padding="2"
            width="100%"
            height="100%"
            alignItems="start"
            justifyContent="center"
        >
            <Grid2 width="100%" height="100%">
                <HeaderPages title={TITLE_PAGES.PRODUCT_DETAIL} />
            </Grid2>
            <Grid2 width="100%" height="100%">
                <ProductDetailComponent productDetailData={productDetail} />
            </Grid2>
        </Grid2>
    );
};

export default ProductDetailPage;
