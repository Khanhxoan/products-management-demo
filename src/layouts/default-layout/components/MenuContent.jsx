import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { ROLE_USERS } from "@/constants/contants";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

const mainListItems = [
    { text: "Home", icon: <HomeRoundedIcon />, url: "/" },
    {
        text: "Manage Products",
        icon: <AnalyticsRoundedIcon />,
        url: "/products",
        role: ROLE_USERS.ADMIN,
    },
];

export default function MenuContent() {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const isAdmin = String(user?.role).toUpperCase() === ROLE_USERS.ADMIN;

    const navigate = useNavigate();
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
            <List dense>
                {mainListItems.map((item, index) => {
                    const showForUser = item?.role !== ROLE_USERS.ADMIN;
                    return (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{ display: showForUser || isAdmin ? "block" : "none" }}
                        >
                            <ListItemButton
                                selected={location.pathname === item.url}
                                sx={{
                                    backgroundColor:
                                        location.pathname === item.url ? "#b2a4a4 !important" : "#fff !important",
                                    ":hover": {
                                        backgroundColor: "#e1cdbe !important",
                                    },
                                }}
                                onClick={() => {
                                    navigate(item.url);
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Stack>
    );
}
