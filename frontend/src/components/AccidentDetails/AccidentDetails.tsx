import React from "react";
import { Paper, Grid, Typography, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpeedIcon from "@mui/icons-material/Speed";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import SecurityIcon from "@mui/icons-material/Security";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WarningIcon from "@mui/icons-material/Warning";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import TimelineIcon from "@mui/icons-material/Timeline";
import HeartRateChart from "../HeartRateChart/HeartRateChart";
import AccidentSimulation from "../AccidentSimulation/AccidentSimulation";
import RescueMissionDetails from "../RescueMissionDetails/RescueMissionDetails";

// Sample data, replace with actual data from your database
const accident = {
  timestamp: new Date().toISOString(),
  vin: "1HGBH41JXMN109186",
  last_timestamp_check: new Date().toISOString(),
  acceleration: 3.5,
  speed: 80,
  license_plates: ["XYZ 1234", "ABC 5678"],
  coordinates: [52.52, 13.405], // Assuming this represents latitude and longitude
  violations: [
    {
      type: "Speeding",
      coordinates: [52.52, 13.405], // Assuming this represents latitude and longitude
      timestamp: new Date().toISOString(),
    },
    // ... add more violations as needed
  ],
  driver: {
    seatbelt: false,
    drowsiness: true,
    heart_rate: [110, 115, 120], // Assuming this is an array of heart rate readings
  },
  passengers_num: 3,
};

const AccidentDetails: React.FC = () => {
  // Function to render violations
  const renderViolations = (violations: typeof accident.violations) => {
    return (
      <Box>
        {violations.map((violation, index) => (
          <Typography key={index} variant="body2">
            {`${violation.type} at ${new Date(violation.timestamp).toLocaleTimeString()} (${violation.coordinates.join(
              ", "
            )})`}
          </Typography>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Paper sx={{ p: 2, margin: "auto", maxWidth: "100%", flexGrow: 1 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Accident Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <DriveEtaIcon />
            <Typography variant="subtitle1">VIN</Typography>
            <Typography variant="body2">{accident.vin}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <TimelineIcon />
            <Typography variant="subtitle1">Acceleration</Typography>
            <Typography variant="body2">{`${accident.acceleration} m/s²`}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <AccessTimeIcon />
            <Typography variant="subtitle1">Timestamp</Typography>
            <Typography variant="body2">{new Date(accident.timestamp).toLocaleString()}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <SpeedIcon />
            <Typography variant="subtitle1">Speed (km/h)</Typography>
            <Typography variant="body2">{accident.speed}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <GpsFixedIcon />
            <Typography variant="subtitle1">Coordinates</Typography>
            <Typography variant="body2">{accident.coordinates.join(", ")}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <DirectionsCarIcon />
            <Typography variant="subtitle1">License Plates</Typography>
            <Typography variant="body2">{accident.license_plates.join(", ")}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <GroupIcon />
            <Typography variant="subtitle1">Number of Passengers</Typography>
            <Typography variant="body2">{accident.passengers_num}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <WarningIcon color={accident.driver.drowsiness ? "error" : "success"} />
            <Typography variant="subtitle1">Drowsiness Detected</Typography>
            <Typography variant="body2">{accident.driver.drowsiness ? "Yes" : "No"}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* <Box sx={{ flexGrow: 1, p: 2 }}>
         <Typography variant="h4" gutterBottom>
           Heart Rate Monitoring
         </Typography>
         <Grid container spacing={3}>
           <Grid item xs={20} md={20}>
             <HeartRateChart />
           </Grid>
           <Grid item xs={20} md={20}>
             <HeartRateChart />
           </Grid>
         </Grid>
       </Box>
       <AccidentSimulation /> */}
<Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
  <Box sx={{ flexGrow: 1, mr: 2 }}>
    <Typography variant="h4" gutterBottom>
      Heart Rate Monitoring
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <HeartRateChart />
      </Grid>
      <Grid item xs={12}>
        <HeartRateChart />
      </Grid>
    </Grid>
  </Box>
  <Box sx={{ flexGrow: 3, ml: 2, mr: 2 }}>
    <Typography variant="h4" gutterBottom>
      Accident Simulation
    </Typography>
    <AccidentSimulation />
  </Box>
  <Box sx={{ flexGrow: 1 }}>
    <RescueMissionDetails />
  </Box>
</Box>

</>

  );
};

export default AccidentDetails;
