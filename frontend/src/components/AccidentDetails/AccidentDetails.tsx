import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WarningIcon from '@mui/icons-material/Warning';

// Sample data, replace with actual data from your database
const accident = {
  timestamp: '2023-04-01T12:00:00Z',
  speed: 80,
  coordinates: '52.5200N, 13.4050E',
  license_plates: ['XYZ 1234', 'ABC 5678'],
  passengers_num: 3,
  seatbelt: false,
  heart_rate: 110,
  drowsiness: true
};

const AccidentDetails: React.FC = () => {
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: '100%', flexGrow: 1 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Accident Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <AccessTimeIcon />
          <Typography variant="subtitle1">Timestamp</Typography>
          <Typography variant="body2">{accident.timestamp}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <SpeedIcon />
          <Typography variant="subtitle1">Speed (km/h)</Typography>
          <Typography variant="body2">{accident.speed}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <GpsFixedIcon />
          <Typography variant="subtitle1">Coordinates</Typography>
          <Typography variant="body2">{accident.coordinates}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <DirectionsCarIcon />
          <Typography variant="subtitle1">License Plates</Typography>
          <Typography variant="body2">{accident.license_plates.join(', ')}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <GroupIcon />
          <Typography variant="subtitle1">Number of Passengers</Typography>
          <Typography variant="body2">{accident.passengers_num}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <SecurityIcon color={accident.seatbelt ? 'success' : 'error'} />
          <Typography variant="subtitle1">Seatbelt</Typography>
          <Typography variant="body2">{accident.seatbelt ? 'Worn' : 'Not Worn'}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <FavoriteIcon color={accident.heart_rate > 100 ? 'error' : 'success'} />
          <Typography variant="subtitle1">Heart Rate</Typography>
          <Typography variant="body2">{`${accident.heart_rate} bpm`}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <WarningIcon color={accident.drowsiness ? 'error' : 'success'} />
          <Typography variant="subtitle1">Drowsiness Detected</Typography>
          <Typography variant="body2">{accident.drowsiness ? 'Yes' : 'No'}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccidentDetails;
