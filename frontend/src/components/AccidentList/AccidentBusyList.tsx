// // src/components/AccidentList.tsx
// import React from "react";
// import { List, ListItem, ListItemText, ListItemIcon, Typography, Chip, Button, Box, Divider } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import SpeedIcon from "@mui/icons-material/Speed";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import PeopleIcon from "@mui/icons-material/People";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import './AccidentList.css';

// interface Accident {
//   _id: string;
//   timestamp: Date;
//   vin: string;
//   last_timestamp_check: Date;
//   acceleration: number;
//   speed: number;
//   license_plates: string[];
//   coordinates: number[]; // [latitude, longitude]
//   violations: Array<{
//     type: string;
//     coordinates: number[]; // [latitude, longitude]
//     timestamp: Date;
//   }>;
//   driver: {
//     seatbelt: boolean;
//     drowsiness: boolean;
//     heart_rate: number[];
//   };
//   passengers_num: number;
// }

// interface Props {
//   accidents: Accident[];
// }

// const AccidentList: React.FC<Props> = ({ accidents }) => {
//   const navigate = useNavigate(); // Inicializujeme hook useNavigate

//   return (
//     // nazov Zoznam aktualnych nehod
//     <>
//       <Typography variant="h6" gutterBottom component="div">
//         List of current accidents
//       </Typography>
//       <List sx={{ width: "100%", bgcolor: "background.paper" }}>
//         {accidents.map((accident, index) => (
//           <React.Fragment key={accident._id}>
//             <ListItem alignItems="flex-start">
//               <ListItemIcon>
//                 <DirectionsCarIcon />
//               </ListItemIcon>
//               <ListItemText
//                 // primary={`Accident #${index + 1}`}
//                 primary={
//                   <>
//                     <FiberManualRecordIcon className="blinking-icon" color="error" />
//                     {` Accident #${index + 1}`}
//                   </>
//                 }
//                 secondary={
//                   <>
//                     <Typography component="span" variant="body2" color="text.primary">
//                       VIN: {accident.vin} - Speed: {accident.speed} km/h
//                     </Typography>
//                     <Chip icon={<SpeedIcon />} label={`${accident.speed} km/h`} />
//                     <Chip
//                       icon={<LocationOnIcon />}
//                       label={`Lat: ${accident.coordinates[0]}, Lon: ${accident.coordinates[1]}`}
//                     />
//                     <Chip icon={<PeopleIcon />} label={`Passengers: ${accident.passengers_num}`} />
//                     <Chip
//                       icon={<AccessTimeIcon />}
//                       label={`Last checked: ${new Date(accident.last_timestamp_check).toLocaleString()}`}
//                     />
//                   </>
//                 }
//               />
//             </ListItem>
//             <Box textAlign="center" my={2}>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => {
//                   console.log(`Clicked on accident #${index + 1}`);
//                   navigate(`/accident-details/${accident._id}`); // Zakomentované pre ukážku
//                 }}
//               >
//                 Details
//               </Button>
//             </Box>
//             <Divider variant="inset" component="li" />
//           </React.Fragment>
//         ))}
//       </List>
//     </>
//   );
// };

// export default AccidentList;

import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, ListItemIcon, Typography, Chip, Button, Box, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SpeedIcon from "@mui/icons-material/Speed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './AccidentList.css';
import axios from 'axios';

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

const AccidentBusyList: React.FC<Props> = ({ accidents }) => {
  const navigate = useNavigate(); // Inicializujeme hook useNavigate
  const [pendingAccidents, setPendingAccidents] = useState<Accident[]>([]);
  let url = process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  useEffect(() => {
    const fetchPendingAccidents = async () => {
      try {
        const response = await axios.get(`${url}/accident/assigned`)
        setPendingAccidents(response.data);
        console.log('Pending accidents:', response.data);
      } catch (error) {
        console.error('Error fetching pending accidents:', error);
      }
    };

    fetchPendingAccidents();
  }, []); 

  return (
    // nazov Zoznam aktualnych nehod
    <>
      <Typography variant="h6" gutterBottom component="div">
        List of assigned accidents
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {pendingAccidents.map((accident, index) => (
          <React.Fragment key={accident._id}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <DirectionsCarIcon />
              </ListItemIcon>
              <ListItemText
                // primary={`Accident #${index + 1}`}
                primary={
                  <>
                    <FiberManualRecordIcon className="blinking-icon" color="error" />
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

export default AccidentBusyList;
