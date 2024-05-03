import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button, TextField, Container, Typography, Box, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  let url = process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}/user/login`, {
        username,
        password
      });

      const { role, token, userId } = response.data;
      Cookies.set('token', token, { expires: 7 });
      auth.login(role, userId);
      setLoading(false);
      
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'user':
          navigate('/user');
          break;
        case 'superadmin':
          navigate('/new-rescue-center');
          break;
        case 'rescuer':
          navigate('/rescuer2');
          break;
          // add dispatcher
        case 'dispatcher':
          navigate('/user');
          break;
        default:
          navigate('/');
      }
    } catch (error: any) {
      setLoading(false);
      setMessage('Invalid credentials or network error');
      setOpen(true);
      console.error('Login error:', error.response?.data?.message || error.message);
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
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
            disabled={loading}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </Container>
  );
};

export default Login;
