// src/components/Rescuer2Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext'; // Adjust the import path as necessary

const Rescuer2Header: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth(); // Use the auth context

    const handleLogout = () => {
      auth.logout(); // Assuming your auth context has a logout method
      navigate('/login'); // Redirect to login after logout
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Rescuer Dashboard
                </Typography>
                <Button color="inherit" onClick={() => navigate('/map')}>Map</Button>
                <Button color="inherit" onClick={() => navigate('/incidents')}>Incidents</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Rescuer2Header;
