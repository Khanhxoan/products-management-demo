import * as React from "react";

import { Grid2 } from "@mui/material";

import NavbarTitle from "./NavbarTitle";

export default function Header() {
    return (
        <Grid2
            direction="row"
            sx={{
                display: { xs: "none", md: "flex" },
                width: "100%",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "space-between",
                pt: 1.5,
            }}
            spacing={2}
        >
            <NavbarTitle />
        </Grid2>
    );
}
