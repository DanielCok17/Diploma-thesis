import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import { Button, TextField, Container, Typography, Box } from '@mui/material';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth(); // Use the hook to get auth context

  const handleLogin = () => {
    const isDispatcher = username === 'admin' && password === 'admin';
    const isRescuer = username === 'user' && password === 'user';
    const isSuperAdmin = username === 'superadmin' && password === 'superadmin';
    // for rescuer
    const isRescuer2 = username === 'rescuer' && password === 'rescuer';
  
    if (isDispatcher) {
      auth.login('admin'); // Pass 'dispatcher' as the role argument
      navigate('/admin');
    } else if (isRescuer) {
      auth.login('user'); // Pass 'rescuer' as the role argument
      navigate('/user');
    } 
    else if (isSuperAdmin) {
      auth.login('superadmin'); // Pass 'superadmin' as the role argument
      navigate('/new-rescue-center');
    }
    else if (isRescuer2) {
      auth.login('rescuer2'); // Pass 'rescuer' as the role argument
      navigate('/rescuer2');
    }
    else {
      alert('Invalid credentials');
    }
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
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
