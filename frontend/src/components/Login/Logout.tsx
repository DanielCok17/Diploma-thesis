import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import { Button, Container, Typography, Box } from '@mui/material';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth(); // Use the hook to get auth context

  const handleLogout = () => {
    auth.logout(); // Call the logout function from auth context
    navigate('/login'); // Redirect to login page or any other route as per your application's routing setup
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Are you sure you want to logout?
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Logout;
