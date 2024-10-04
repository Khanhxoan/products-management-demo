import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useParams } from 'react-router-dom';

import HeaderPages from '@/components/HeaderPages';
import CUProductComponent from '@/components/products/CUProductComponent';
import {
  MODE_PRODUCT_FORM,
  TITLE_PAGES,
} from '@/constants/contants';
import { Grid2 } from '@mui/material';

const UpdateProductPage = () => {
    const { productDetail } = useSelector((state) => state.products);
    const { productId } = useParams();
    const dispactch = useDispatch();

    useEffect(() => {
        if (!productDetail._id || productDetail._id !== productId) {
            dispactch(getProductDetailThunk(productId));
        }
    }, []);

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
                <HeaderPages title={TITLE_PAGES.UPDATE_PRODUCT} />
            </Grid2>
            <Grid2 width="100%" height="100%">
                <CUProductComponent mode={MODE_PRODUCT_FORM.UPDATE} />
            </Grid2>
        </Grid2>
    );
};

export default UpdateProductPage;
