import * as React from 'react';

import Typography from '@mui/material/Typography';

export default function NavbarTitle() {
    const title = "Home";
    return (
        <Typography
            variant="body1"
            sx={{ color: "text.primary", fontWeight: 600 }}
        >
            {title}
        </Typography>
    );
}
