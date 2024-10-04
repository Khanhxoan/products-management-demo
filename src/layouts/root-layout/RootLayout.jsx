import React from "react";

import { Outlet } from "react-router-dom";

import CustomToast from "@/components/custom-toast/custom-toast";

const RootLayout = () => {
    return (
        <>
            <Outlet />
            <CustomToast />
        </>
    );
};

export default RootLayout;
