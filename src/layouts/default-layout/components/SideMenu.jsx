import * as React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { notify } from '@/components/custom-toast/custom-toast';
import LoadingComponent from '@/components/loading-component/LoadingComponent';
import { TOAST_STATUS } from '@/constants/contants';
import { logoutThunk } from '@/stores/authSlice/authSlice';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Button,
  Grid2,
  IconButton,
  Tooltip,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import MenuContent from './MenuContent';

const drawerWidth = 250;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: "border-box",
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: "border-box",
    },
});

export default function SideMenu() {
    const { user, loadingLogout } = useSelector((state) => state.auth);
    const isLogin = user !== null;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const resultAction = await dispatch(logoutThunk());
            if (logoutThunk.fulfilled.match(resultAction)) {
                notify("Logout successfully!", TOAST_STATUS.SUCCESS);
                navigate("/login");
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
            variant="permanent"
            sx={{
                display: { xs: "none", md: "block" },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: "background.paper",
                },
                zIndex: 1,
            }}
        >
            <Box sx={{ p: 1 }}>
                <img
                    src="https://static.topcv.vn/company_logos/wADV14D3mxDdN3Si5iNC32PvihdWExHV_1637206489____52b9e56079c77355b6dfbfe73f311843.png"
                    width="100%"
                    height="fit-content"
                />
            </Box>
            <MenuContent />
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: "center",
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                {isLogin ? (
                    <Grid2 container direction={"row"} justifyContent="space-between" alignItems="center" width="100%">
                        <Grid2 container gap="10px" direction="row">
                            <Avatar
                                sizes="small"
                                alt="Riley Carter"
                                src={user.avatarUrl}
                                sx={{ width: 36, height: 36 }}
                            />
                            <Box sx={{ mr: "auto" }}>
                                <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: "16px" }}>
                                    {user.username}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    textTransform="uppercase"
                                    fontWeight="600"
                                    sx={{ color: "text.secondary" }}
                                >
                                    {user.role}
                                </Typography>
                            </Box>
                        </Grid2>
                        <Tooltip title="Logout">
                            <IconButton onClick={handleLogout}>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid2>
                ) : (
                    <Button
                        sx={{ width: "100%", height: "100%" }}
                        variant="outlined"
                        startIcon={<LoginIcon />}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                )}
            </Stack>
        </Drawer>
    );
}
