import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify } from "@/components/custom-toast/custom-toast";
import LoadingComponent from "@/components/loading-component/LoadingComponent";
import { TOAST_STATUS } from "@/constants/contants";
import { logoutThunk } from "@/stores/authSlice/authSlice";
import LoginIcon from "@mui/icons-material/Login";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import MenuContent from "./MenuContent";

export default function SideMenuMobile({ open, toggleDrawer }) {
    const { user, loadingLogout } = useSelector((state) => state.auth);
    const isLogin = user !== null;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const resultAction = dispatch(logoutThunk());
            if (logoutThunk.fulfilled.match(resultAction)) {
                notify("Logout successfully!", TOAST_STATUS.SUCCESS);
                navigate("/");
            }
        } catch (err) {
            notify("Logout fail!", TOAST_STATUS.ERORR);
        }
    };
    if (loadingLogout) {
        return <LoadingComponent contentLoading="Logging out..." />;
    }
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
                [`& .${drawerClasses.paper}`]: {
                    backgroundImage: "none",
                    backgroundColor: "background.paper",
                },
            }}
        >
            <Stack
                sx={{
                    maxWidth: "70dvw",
                    height: "100%",
                    minWidth: "40dvw",
                }}
            >
                <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
                    <Stack direction="row" sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}>
                        {isLogin ? (
                            <>
                                <Avatar
                                    sizes="small"
                                    alt="Riley Carter"
                                    src={user?.avatarUrl}
                                    sx={{ width: 24, height: 24 }}
                                />
                                <Typography component="p" variant="h6">
                                    {user?.username}
                                </Typography>
                            </>
                        ) : (
                            <Button
                                sx={{ width: "100%", height: "100%" }}
                                onClick={() => navigate("/login")}
                                variant="outlined"
                                startIcon={<LoginIcon />}
                            >
                                Login
                            </Button>
                        )}
                    </Stack>
                </Stack>
                <Stack sx={{ flexGrow: 1 }}>
                    <MenuContent />
                    <Divider />
                </Stack>
                {isLogin && (
                    <Stack sx={{ p: 2 }}>
                        <Button variant="outlined" onClick={handleLogout} fullWidth startIcon={<LogoutRoundedIcon />}>
                            Logout
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Drawer>
    );
}
