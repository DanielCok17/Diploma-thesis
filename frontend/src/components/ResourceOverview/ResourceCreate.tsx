import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";

interface User {
  _id: string;
  username: string;
}

interface RescueCenter {
  _id: string;
  address: string;
}

const typeMap = {
    policeman: 'Police',
    firefighter: 'Fire',
    rescuer: 'Ambulance'
  };

// Define the vehicle types
const vehicleTypes = ["Police", "Fire", "Ambulance"];

const ResourceCreate = () => {
  const [type, setType] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [rescueCenters, setRescueCenters] = useState<RescueCenter[]>([]);
  const [selectedCenters, setSelectedCenters] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  let url =
    process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  console.log("URL:", url);
  console.log("REACT_APP_ENVIRONMENT:", process.env.REACT_APP_ENVIRONMENT);
  console.log("REACT_APP_PROD_URL:", process.env.REACT_APP_PROD_URL);

  // if url is undefined, set it to REACT_APP_PROD_URL
  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  useEffect(() => {
    // Fetch rescue centers on component mount
    const fetchRescueCenters = async () => {
      const response = await axios.get<RescueCenter[]>(`${url}/rescue-center`);
      setRescueCenters(response.data);
    };
    fetchRescueCenters();
  }, []);

  const handleTypeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = event.target.value;
    setType(selectedType);

    // Fetch users based on selected type
    const userResponse = await axios.get<User[]>(`${url}/user/role/${selectedType}`);
    setUsers(userResponse.data);
  };

  const handleRescueCenterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.name;
    setSelectedCenters((prev) => (prev.includes(id) ? prev.filter((centerId) => centerId !== id) : [...prev, id]));
  };

  const handleSubmit = async () => {
    const data = {
      type,
      rescueCenterIds: selectedCenters,
      userId,
      rescueCenterId: "",
      status: "Available",
      defaultLocation: { coordinates: [48.185, 17.138] },
      currentLocation: { coordinates: [48.185, 17.138] },
    };

    try {
        // add rescueCenterId to the data
        const rescueCenterId = selectedCenters[0];
        data.rescueCenterId = rescueCenterId;
        

      const response = await axios.post(`${url}/rescue-unit`, data);
      // add rescueCenterId to the respons
      console.log("Resource created:", response.data);
      handleClose();
    } catch (error) {
      console.error("Failed to create resource:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        Add New Rescue Unit
      </Typography>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add New Rescue Unit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Rescue Unit</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" fullWidth>
            <TextField select label="Type" value={type} onChange={handleTypeChange} margin="normal">
              {vehicleTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="User"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              margin="normal"
              fullWidth
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.username}
                </MenuItem>
              ))}
            </TextField>
            <FormGroup>
              {rescueCenters.map((center) => (
                <FormControlLabel
                  key={center._id}
                  control={
                    <Checkbox
                      checked={selectedCenters.includes(center._id)}
                      onChange={handleRescueCenterChange}
                      name={center._id}
                    />
                  }
                  label={center.address}
                />
              ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResourceCreate;
