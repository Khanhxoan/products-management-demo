import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Box, LinearProgress, Typography } from "@mui/material";

const LoadingComponent = ({ contentLoading }) => {
    const modalRootElementRef = useRef(document.createElement("div"));
    useEffect(() => {
        const modalRootElement = modalRootElementRef.current;
        document.body.appendChild(modalRootElement);
        return () => {
            document.body.removeChild(modalRootElement);
        };
    }, []);
    return createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.3)",
                gap: "30px",
            }}
        >
            <Box sx={{ width: "60%" }}>
                <LinearProgress />
            </Box>
            <Typography variant="h4" fontWeight={500} textAlign="center">
                {contentLoading}
            </Typography>
        </div>,
        modalRootElementRef.current
    );
};

export default LoadingComponent;
