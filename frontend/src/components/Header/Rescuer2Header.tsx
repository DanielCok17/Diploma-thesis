// src/components/Rescuer2Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext'; // Adjust the import path as necessary

const Rescuer2Header: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };

    const drawer = (
        <List>
            <ListItem button onClick={() => navigate('/map')}>
                <ListItemText primary="Map" />
            </ListItem>
            <ListItem button onClick={() => navigate('/incidents')}>
                <ListItemText primary="Incidents" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                    Rescuer Dashboard
                </Typography>
                <Button color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }} onClick={() => navigate('/map')}>Map</Button>
                <Button color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }} onClick={() => navigate('/incidents')}>Incidents</Button>
                <Button color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }} onClick={handleLogout}>Logout</Button>
                <Drawer
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
                    }}
                >
                    {drawer}
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Rescuer2Header;

