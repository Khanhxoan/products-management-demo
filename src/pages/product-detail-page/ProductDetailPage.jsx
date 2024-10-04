import React from 'react';

import HeaderPages from '@/components/HeaderPages';
import ProductDetailComponent
  from '@/components/products/product-detail/ProductDetailComponent';
import { TITLE_PAGES } from '@/constants/contants';
import { Grid2 } from '@mui/material';

const ProductDetailPage = () => {
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
                <ProductDetailComponent />
            </Grid2>
        </Grid2>
    );
};

export default ProductDetailPage;
