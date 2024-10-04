import * as React from "react";

import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";

import AppNavbar from "./components/AppNavbar";
import Header from "./components/HeaderComponents";
import SideMenu from "./components/SideMenu";

const DefaultLayout = () => {
    return (
        <React.Fragment>
            <Box sx={{ display: "flex" }}>
                <SideMenu />
                <AppNavbar />
                {/* Main content */}
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: "auto",
                        mt: "10px",
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            mx: 3,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <Outlet />
                    </Stack>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default DefaultLayout;
