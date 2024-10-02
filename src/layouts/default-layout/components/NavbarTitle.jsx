import * as React from 'react';

import Typography from '@mui/material/Typography';

export default function NavbarTitle() {
    const title = "Products management tool";
    return (
        <Typography
            variant="body1"
            fontStyle="italic"
            sx={{ color: "text.primary", fontWeight: 600 }}
        >
            {title}
        </Typography>
    );
}
