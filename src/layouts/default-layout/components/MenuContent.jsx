import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

const mainListItems = [
    { text: "Home", icon: <HomeRoundedIcon />, url: "/" },
    {
        text: "Manage Products",
        icon: <AnalyticsRoundedIcon />,
        url: "/products",
    },
];

export default function MenuContent() {
    const location = useLocation();
    console.log(location.pathname);

    const navigate = useNavigate();
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            selected={location.pathname === item.url}
                            sx={{
                                backgroundColor:
                                    location.pathname === item.url
                                        ? "#b2a4a4 !important"
                                        : "#fff !important",
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
                ))}
            </List>
        </Stack>
    );
}
