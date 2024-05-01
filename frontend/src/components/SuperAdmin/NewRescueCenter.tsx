import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, makeStyles } from '@material-ui/core';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L, { LatLng, LatLngLiteral, LatLngBounds, Polyline, Polygon, Rectangle, Circle } from 'leaflet';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  map: {
    height: 400, // Set the height of the map
    width: '100%',
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
}

export const NewRescueCenter: React.FC = () => {
  const classes = useStyles();
  const [form, setForm] = useState<RescueCenterForm>({
    name: '',
    address: '',
    contactNumber: '',
    area: []
  });

  const handleAreaChange = (e: any) => {
    const layer = e.layer; // This is the drawn layer
  
    let simpleCoordinates: LatLngLiteral[] = [];
  
    // Check if it's a type of layer that supports getLatLngs (like Polyline or Polygon)
    if (typeof layer.getLatLngs === 'function') {
      const coordinates: LatLng[][] = layer.getLatLngs() as LatLng[][];
      simpleCoordinates = coordinates.flat().map((latLng: LatLng) => ({
        lat: latLng.lat,
        lng: latLng.lng
      }));
    } else if (typeof layer.getBounds === 'function') {
      // For rectangle and circle, get the bounds or center
      const bounds: LatLngBounds = layer.getBounds();
      simpleCoordinates.push({ lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng });
      simpleCoordinates.push({ lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng });
    } else if (typeof layer.getCenter === 'function') {
      // For circle, get the center and radius (though radius is not LatLngLiteral)
      const center: LatLng = layer.getCenter();
      simpleCoordinates.push({ lat: center.lat, lng: center.lng });
      // Optionally handle radius here, if relevant
    }
  
    // Now handle your state update with the coordinates
    setForm({
      ...form,
      area: simpleCoordinates
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form); // You'd likely want to send this data off to a server
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
          <TextField required label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} />
          <div className={classes.map}>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className={classes.map}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <FeatureGroup>
                <EditControl
                  position='topright'
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
    </Container>
  );
};

export default NewRescueCenter;
