// src/components/AccidentList.tsx
import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Typography, Chip, Button, Box, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SpeedIcon from "@mui/icons-material/Speed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import { styled, keyframes } from '@mui/system';

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

interface Props {
  accidents: Accident[];
}

const AccidentList: React.FC<Props> = ({ accidents }) => {
  const navigate = useNavigate(); // Inicializujeme hook useNavigate
  const blinkKeyframes = `
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const BlinkingStatus = ({ className, color }: { className?: string; color?: string }) => (
  <FiberManualRecordIcon className={`${className} blink`} style={{ color: color }} />
);



  return (
    // nazov Zoznam aktualnych nehod
    <>
      <Typography variant="h6" gutterBottom component="div">
        List of current accidents
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {accidents.map((accident, index) => (
          <React.Fragment key={accident._id}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <DirectionsCarIcon />
              </ListItemIcon>
              <ListItemText
primary={
    <>
      <BlinkingStatus color="error" /> {/* Červená blikajúca gulička */}
      {` Accident #${index + 1}`}
    </>
}
    secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      VIN: {accident.vin} - Speed: {accident.speed} km/h
                    </Typography>
                    <Chip icon={<SpeedIcon />} label={`${accident.speed} km/h`} />
                    <Chip
                      icon={<LocationOnIcon />}
                      label={`Lat: ${accident.coordinates[0]}, Lon: ${accident.coordinates[1]}`}
                    />
                    <Chip icon={<PeopleIcon />} label={`Passengers: ${accident.passengers_num}`} />
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={`Last checked: ${new Date(accident.last_timestamp_check).toLocaleString()}`}
                    />
                  </>
                }
              />
            </ListItem>
            <Box textAlign="center" my={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  console.log(`Clicked on accident #${index + 1}`);
                  navigate(`/accident-details/${accident._id}`); // Zakomentované pre ukážku
                }}
              >
                Details
              </Button>
            </Box>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default AccidentList;
