import React from 'react';

import { Typography } from '@mui/material';

const HeaderPages = ({ title = "" }) => {
    return (
        <Typography
            variant="h4"
            color="#48567d"
            fontWeight="700"
            textTransform="uppercase"
        >
            {title}
        </Typography>
    );
};

export default HeaderPages;
