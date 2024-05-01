// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Tabs, Tab, Button, Popover, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext'; // Adjust the import path as necessary
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



const Header: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const auth = useAuth(); // Use the auth context

    const handleLogout = () => {
      auth.logout(); // Assuming your auth context has a logout method
      navigate('/login'); // Adjust the route as necessary
    };

    const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // Dummy data, replace with real data
    const incidents = [
        { id: 1, title: "Incident 1", description: "Incident description here..." },
        { id: 2, title: "Incident 2", description: "Another incident description..." }
    ];
  
    const drawer = (
        <div>
            <List>
                <ListItem button key="overview" onClick={() => navigate('/user')}>
                    <ListItemText primary="Overview" />
                </ListItem>
                <ListItem button key="incidents" onClick={() => navigate('/accident-details/1')}>
                    <ListItemText primary="Incidents" />
                </ListItem>
                <ListItem button key="resources" onClick={() => navigate('/resource-overview')}>
                    <ListItemText primary="Resources" />
                </ListItem>
                <ListItem button key="analytics" onClick={() => navigate('/reporting-analytics')}>
                    <ListItemText primary="Analytics" />
                </ListItem>
                <ListItem button key="logout" onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );
  

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
        // Predpokladajme, že cesty sú presne takéto:
        switch (newValue) {
            case 0:
                navigate('/user');
                break;
            case 1:
                navigate('/accident-details/1');
                break;
            case 2:
                navigate('/resource-overview');
                break;
            case 3:
                navigate('/reporting-analytics');
                break;
            default:
                navigate('/');
        }
    };

    return (
        <AppBar position="static">
        <Toolbar>
            {isMobile && (
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Rescue Dashboard
                </Link>
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationClick}>
                <Badge badgeContent={incidents.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            {!isMobile && (
                <Tabs value={selectedTab} onChange={handleTabChange} textColor="inherit">
                    <Tab label="Overview" />
                    <Tab label="Incidents" />
                    <Tab label="Resources" />
                    <Tab label="Analytics" />
                </Tabs>
            )}
            {!isMobile && (
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            )}
        </Toolbar>
        {isMobile && (
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
        )}
    </AppBar>
);
};

export default Header;
