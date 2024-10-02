import React from 'react';

import HeaderPages from '@/components/HeaderPages';
import { TITLE_PAGES } from '@/constants/contants';
import { Grid2 } from '@mui/material';

const UpdateProductPage = () => {
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
            <Grid2 item xs={6} md={8}>
                <HeaderPages title={TITLE_PAGES.UPDATE_PRODUCT} />
            </Grid2>
        </Grid2>
    );
};

export default UpdateProductPage;
