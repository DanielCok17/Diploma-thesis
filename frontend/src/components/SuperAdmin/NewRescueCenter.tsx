import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Paper, makeStyles } from "@material-ui/core";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L, { LatLng, LatLngLiteral, LatLngBounds, Polyline, Polygon, Rectangle, Circle } from "leaflet";
import axios from "axios";
import { Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";

let url = process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

interface User {
  _id: string; // assuming _id is provided by MongoDB
  username: string;
  role: string;
  isActive: boolean;
  personalInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  settings: {
    language: string;
    notifications: boolean;
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  map: {
    height: 400, // Set the height of the map
    width: "100%",
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

interface RescueCenterForm {
  name: string;
  address: string;
  contactNumber: string;
  area: LatLngLiteral[]; // Expecting an array of LatLngLiteral for simpler handling
  userId: string;
}

export const NewRescueCenter: React.FC = () => {
  const classes = useStyles();
  const [form, setForm] = useState<RescueCenterForm>({
    name: "",
    address: "",
    contactNumber: "",
    area: [],
    userId: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info"); // Explicitly typed as AlertColor
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/user/dispatcher`);
        setUsers(response.data); // Make sure response data is an array of User objects
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleAreaChange = (e: any) => {
    const layer = e.layer; // This is the drawn layer

    let simpleCoordinates: LatLngLiteral[] = [];

    // Check if it's a type of layer that supports getLatLngs (like Polyline or Polygon)
    if (typeof layer.getLatLngs === "function") {
      const coordinates: LatLng[][] = layer.getLatLngs() as LatLng[][];
      simpleCoordinates = coordinates.flat().map((latLng: LatLng) => ({
        lat: latLng.lat,
        lng: latLng.lng,
      }));
    } else if (typeof layer.getBounds === "function") {
      // For rectangle and circle, get the bounds or center
      const bounds: LatLngBounds = layer.getBounds();
      simpleCoordinates.push({ lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng });
      simpleCoordinates.push({ lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng });
    } else if (typeof layer.getCenter === "function") {
      // For circle, get the center and radius (though radius is not LatLngLiteral)
      const center: LatLng = layer.getCenter();
      simpleCoordinates.push({ lat: center.lat, lng: center.lng });
      // Optionally handle radius here, if relevant
    }

    // Now handle your state update with the coordinates
    setForm({
      ...form,
      area: simpleCoordinates,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form); // You'd likely want to send this data off to a server

    try {
      const response = await axios.post(`${url}/rescue-center`, form);
      console.log("Success:", response.data);
      // Here you might clear the form or redirect the user
      setForm({
        name: "",
        address: "",
        contactNumber: "",
        area: [],
        userId: "",
      });
      // Set snackbar for success message
      setSnackbarMessage("Rescue center created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error creating rescue center:", error);
      // Set snackbar for error message
      setSnackbarMessage("Failed to create rescue center.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Paper elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create New Rescue Center
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField required label="Name of Rescue Center" name="name" value={form.name} onChange={handleChange} />
          <TextField required label="Address" name="address" value={form.address} onChange={handleChange} />
          <TextField
            required
            label="Contact Number"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
          />
          {form.userId && (
          <TextField required label="User ID" name="userId" value={form.userId} onChange={handleChange} />
          )
          }
          {loading ? (
            <div>Loading...</div>
          ) : (
            <FormControl fullWidth required>
              <InputLabel id="user-label">User</InputLabel>
              <Select
                labelId="user-label"
                id="user-select"
                value={form.userId}
                label="User"
                onChange={(event) => setForm({ ...form, userId: event.target.value })}
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.personalInfo?.firstName} {user.personalInfo?.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <div className={classes.map}>
            <MapContainer center={[48.181527, 17.135058]} zoom={13} scrollWheelZoom={false} className={classes.map}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <FeatureGroup>
                <EditControl
                  position="topright"
                  onCreated={handleAreaChange}
                  draw={{
                    rectangle: true,
                    polygon: true,
                    circle: false,
                    polyline: false,
                    marker: false,
                  }}
                />
              </FeatureGroup>
            </MapContainer>
          </div>
          <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
            Create Center
          </Button>
        </form>
      </Paper>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewRescueCenter;
