// src/components/SuperAdminHeader.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext'; // Adjust the import path as necessary

const SuperAdminHeader: React.FC = () => {
  const navigate = useNavigate();

  // Handle creation of new rescue centers (you'll need to add your own logic here)
  const handleCreateCenter = () => {
    // This would be replaced with your actual navigation/route logic
    navigate('/list-of-rescue-centers');
  };

  const auth = useAuth(); // Use the auth context

  const handleLogout = () => {
    auth.logout(); // Assuming your auth context has a logout method
    navigate('/login'); // Adjust the route as necessary
  };

    const handleCreateCenter2 = () => {
        navigate('/new-rescue-center');
    };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Button color="inherit" onClick={handleCreateCenter2}> Super admin dashboard </Button>
        </Typography>
        <Button color="inherit" onClick={handleCreateCenter}>
          List of Rescue Centers
        </Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default SuperAdminHeader;
