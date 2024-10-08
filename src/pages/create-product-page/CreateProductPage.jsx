import React from 'react';

import HeaderPages from '@/components/HeaderPages';
import CUProductComponent from '@/components/products/CUProductComponent';
import { TITLE_PAGES } from '@/constants/contants';
import { Grid2 } from '@mui/material';

const CreateProductPage = () => {
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
            <Grid2 item width="100%" height="100%">
                <HeaderPages title={TITLE_PAGES.CREATE_PRODUCT} />
            </Grid2>
            <Grid2 width="100%" height="100%">
                <CUProductComponent />
            </Grid2>
        </Grid2>
    );
};

export default CreateProductPage;
