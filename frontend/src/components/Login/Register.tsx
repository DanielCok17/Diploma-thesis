import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Snackbar,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const roles = [
  "dispatcher",
  "superadmin",
  "rescuer",
  "policeman",
  "firefighter",
];

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  let url =
    process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}/user/register`, {
        username,
        password,

        firstName,
        lastName,
        phoneNumber,
        role: selectedRoles[0], // Assuming you can only select one role
      });

      const { role, token, userId } = response.data;
      setLoading(false);
      navigate("/login" + role);
    } catch (error: any) {
      setLoading(false);
      setMessage("Failed to register, try again");
      setOpen(true);
      console.error("Register error:", error.response?.data?.message || error.message);
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    setSelectedRoles((prev) => (prev.includes(value) ? prev.filter((role) => role !== value) : [...prev, value]));
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
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

  const handleNavigateToRegister = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleRegister}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <FormGroup>
            {roles.map((role, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox checked={selectedRoles.includes(role)} onChange={handleRoleChange} name={role} />}
                label={role.charAt(0).toUpperCase() + role.slice(1)}
              />
            ))}
          </FormGroup>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            Register
          </Button>
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Button onClick={handleNavigateToRegister} color="primary">
              Sign in now
            </Button>
          </Typography>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={message} action={action} />
    </Container>
  );
};

export default Register;
