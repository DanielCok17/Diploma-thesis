// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Tabs, Tab, Button, Popover, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext'; // Adjust the import path as necessary


const Header: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);


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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Rescue Dashboard
                </Typography>
                <IconButton color="inherit" onClick={handleNotificationClick}>
                    <Badge badgeContent={incidents.length} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleNotificationClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <List component="nav" aria-label="secondary mailbox folders">
                        {incidents.map((incident) => (
                            <ListItem button key={incident.id} onClick={() => navigate(`/accident-details/${incident.id}`)}>
                                <ListItemText primary={incident.title} secondary={incident.description} />
                            </ListItem>
                        ))}
                    </List>
                </Popover>
                <Tabs value={selectedTab} onChange={handleTabChange} textColor="inherit">
                    <Tab label="Overview" />
                    <Tab label="Incidents" />
                    <Tab label="Resources" />
                    <Tab label="Analytics" />
                </Tabs>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
