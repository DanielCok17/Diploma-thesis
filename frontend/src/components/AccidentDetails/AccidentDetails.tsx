import React, { useEffect, useState } from "react";
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
import axios from "axios";
let url = process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

if (!url) {
  url = process.env.REACT_APP_PROD_URL;
}
// Sample data, replace with actual data from your database
interface Accident {
  _id: string;
  timestamp: Date;
  vin: string;
  last_timestamp_check: Date;
  acceleration: number;
  speed: number;
  license_plates: string[];
  coordinates: number[]; // [latitude, longitude]
  violations: Array<{
    type: string;
    coordinates: number[]; // [latitude, longitude]
    timestamp: Date;
  }>;
  driver: {
    seatbelt: boolean;
    drowsiness: boolean;
    heart_rate: number[];
  };
  passengers_num: number;
}

const AccidentDetails: React.FC = () => {
  const [accident, setAccident] = useState<Accident | null>(null);

  // Fetch accident details from the server
  useEffect(() => {
    const fetchAccidentDetails = async () => {
      // get accident id from the URL
      const urlPath = window.location.hash; // Gets the hash part of the URL which includes '#'
      const accidentId = urlPath.split("/accident-details/")[1];
      try {
        const response = await axios.get(`${url}/accident/${accidentId}`);
        setAccident(response.data);
      } catch (error) {
        console.error("Error fetching accident details:", error);
      }
    };

    fetchAccidentDetails();
  }, []);

  // Function to render violations
  // const renderViolations = (violations: typeof accident.violations) => {
  //   return (
  //     <Box>
  //       {violations.map((violation, index) => (
  //         <Typography key={index} variant="body2">
  //           {`${violation.type} at ${new Date(violation.timestamp).toLocaleTimeString()} (${violation.coordinates.join(
  //             ", "
  //           )})`}
  //         </Typography>
  //       ))}
  //     </Box>
  //   );
  // };

  if (!accident) {
    return <p>Loading accident details...</p>; // or some loading spinner
  }

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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Column layout for extra-small to medium screens, row for medium and above
          p: 2,
        }}
      >
        <Box
          sx={{
            flexGrow: { xs: 1, md: 1 },
            mb: { xs: 2, md: 0 }, // Margin bottom on small screens only
            mr: { xs: 0, md: 2 }, // Margin right on medium and larger screens only
          }}
        >
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
        <Box
          sx={{
            flexGrow: { xs: 1, md: 3 },
            mx: { xs: 0, md: 2 }, // Horizontal margins removed on small screens, added on medium and larger screens
          }}
        >
          <Typography variant="h4" gutterBottom>
            Accident Simulation
          </Typography>
          <AccidentSimulation />
        </Box>
        <Box
          sx={{
            flexGrow: { xs: 1, md: 1 },
            mt: { xs: 2, md: 0 }, // Top margin on small screens only
          }}
        >
          <RescueMissionDetails />
        </Box>
      </Box>
    </>
  );
};

export default AccidentDetails;
