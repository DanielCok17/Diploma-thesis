// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Paper } from '@mui/material';
// import './AccidentSimulation.css';

// interface Props {
//   accidentId: string;
// }

// const AccidentSimulation: React.FC<Props> = ({ accidentId }) => {
//   const [speed, setSpeed] = useState(0);
//   const [wheelRotation, setWheelRotation] = useState(0);
//   const [seatbeltOn, setSeatbeltOn] = useState([false, false, false, false, false]);
//   const [gasPedalPressed, setGasPedalPressed] = useState(false);
//   const [brakePedalPressed, setBrakePedalPressed] = useState(false);
//   const [eyesOpen, setEyesOpen] = useState(true);

//   useEffect(() => {
//     const gasPedalTimeout = setTimeout(() => {
//       setGasPedalPressed(true);
//       setTimeout(() => {
//         setGasPedalPressed(false);
//       }, 3000);
//     }, 1000);

//     const brakePedalTimeout = setTimeout(() => {
//       setBrakePedalPressed(true);
//       setTimeout(() => {
//         setBrakePedalPressed(false);
//       }, 3000);
//     }, 2000);

//     const eyesTimeout = setTimeout(() => {
//       setEyesOpen(false);
//       setTimeout(() => {
//         setEyesOpen(true);
//       }, 500);
//     }, 5000);

//     const interval = setInterval(() => {
//       setSpeed((prevSpeed) => (prevSpeed >= 100 ? 0 : prevSpeed + 20));
//       setWheelRotation((prevRotation) => (prevRotation >= 180 ? -180 : prevRotation + 90));
//       setSeatbeltOn(seatbeltOn.map(belt => !belt));
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//       clearTimeout(gasPedalTimeout);
//       clearTimeout(brakePedalTimeout);
//       clearTimeout(eyesTimeout);
//     };
//   }, [seatbeltOn]);

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <Box position="relative" className="wheel" style={{ transform: `rotate(${wheelRotation}deg)` }}>
//         <Typography variant="caption">Wheel</Typography>
//       </Box>
//       <Box position="absolute" bottom="-90px" left="10%" className="brake-pedal">
//         <Typography variant="caption" textAlign="center" style={{ backgroundColor: brakePedalPressed ? 'red' : 'gray' }}>Brake</Typography>
//       </Box>
//       <Box position="absolute" bottom="-90px" right="10%" className="gas-pedal">
//         <Typography variant="caption" textAlign="center" style={{ backgroundColor: gasPedalPressed ? 'green' : 'gray' }}>Gas</Typography>
//       </Box>
//        <Box display="flex" justifyContent="center" mt={2}>
//     {seatbeltOn.slice(0, 2).map((belt, index) => (
//       <Paper key={index} className="seat">
//         <Typography variant="caption">{belt ? 'Belted' : 'Unbelted'}</Typography>
//       </Paper>
//     ))}
//   </Box>
//   {/* Displaying the remaining three seats */}
//   <Box display="flex" justifyContent="center" mt={2}>
//     {seatbeltOn.slice(2).map((belt, index) => (
//       <Paper key={index + 2} className="seat"> {/* Ensure unique keys by adjusting the index */}
//         <Typography variant="caption">{belt ? 'Belted' : 'Unbelted'}</Typography>
//       </Paper>
//     ))}
//   </Box>
//       <div className={`eye-indicator ${eyesOpen ? 'open' : 'closed'}`}></div>
//       <Typography ml={1}>Driver's Eyes: {eyesOpen ? 'Open' : 'Closed'}</Typography>
//       <Typography className="speedometer">Speed: {speed} km/h</Typography>
//       <Typography className="seatbelt-indicator">
//         Driver Seatbelt: {seatbeltOn[0] ? 'On' : 'Off'}
//       </Typography>
//     </Box>
//   );
// };

// export default AccidentSimulation;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";
import "./AccidentSimulation.css";
import SteeringWheel from "../Rescuer2/SteeringWheel";

interface Props {
  accidentId: string;
}

interface AccidentData {
  timestamp: Date;
  vin: string;
  last_timestamp_check: Date;
  acceleration: number;
  speed: number;
  license_plates: string[];
  coordinates: number[];
  violations: Array<{
    type: string;
    coordinates: number[];
    timestamp: Date;
  }>;
  driver: {
    seatbelt: boolean;
    drowsiness: boolean;
    heart_rate: number[];
  };
  passengers_num: number;
  status: string;
}

interface VehicleState {
  vin: string;
  states: {
    steering_wheel_angle: number;
    brake_pedal: boolean;
    acceleration_pedal: number;
  }[];
}

const AccidentSimulation: React.FC<Props> = ({ accidentId }) => {
  const [accidentData, setAccidentData] = useState<AccidentData | null>(null);
  const [vehicleState, setVehicleState] = useState<VehicleState | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [seatbeltOn, setSeatbeltOn] = useState<boolean[]>([false, false, false, false, false]);
  const [brakePedalPressed, setBrakePedalPressed] = useState(false);
  const [gasPedalPressed, setGasPedalPressed] = useState(false);
  const [eyesOpen, setEyesOpen] = useState(true);

  let url =
    process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  // if url is undefined, set it to REACT_APP_PROD_URL
  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  useEffect(() => {
    const fetchAccidentData = async () => {
      try {
        const response = await axios.get<AccidentData>(`${url}/accident/${accidentId}`);
        setAccidentData(response.data);
        fetchVehicleState(response.data.vin);
      } catch (error) {
        console.error("Error fetching accident data:", error);
      }
    };

    const fetchVehicleState = async (vin: string) => {
      try {
        const response = await axios.get<VehicleState>(`${url}/vehicle-state/${vin}`);
        setVehicleState(response.data);
      } catch (error) {
        console.error("Error fetching vehicle state:", error);
      }
    };

    fetchAccidentData();
  }, [accidentId]);

  // This useEffect simulates various vehicle behaviors
  useEffect(() => {
    const interval = setInterval(() => {
      if (vehicleState) {
        // Simulate dynamic updates to speed and wheel rotation based on vehicle state
        setSpeed((prevSpeed) => (prevSpeed >= 100 ? 0 : prevSpeed + 20));
        setWheelRotation((prevRotation) => (prevRotation >= 180 ? -180 : prevRotation + 90));
        setSeatbeltOn(seatbeltOn.map((belt) => !belt));
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [vehicleState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (vehicleState && vehicleState.states.length > 0) {
        const latestState = vehicleState.states[vehicleState.states.length - 1];
        setWheelRotation(latestState.steering_wheel_angle);
        setBrakePedalPressed(latestState.brake_pedal);
        setGasPedalPressed(latestState.acceleration_pedal > 0);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [vehicleState]);

  return (
    <>
    <Box display="flex" flexDirection="column" alignItems="center">

      {accidentData && vehicleState && (
        <>
            <SteeringWheel data={vehicleState} />

          {/* <Paper className="wheel" style={{ transform: `rotate(${wheelRotation}deg)` }}>
            <Typography variant="caption">Steering Wheel</Typography>
          </Paper> */}
          <Box className=" brake-pedal" style={{ backgroundColor: brakePedalPressed ? "red" : "gray" }}>
            <Typography variant="caption">Brake Pedal</Typography>
          </Box>
          <Box className=" gas-pedal" style={{ backgroundColor: gasPedalPressed ? "green" : "gray" }}>
            <Typography variant="caption">
              Gas Pedal: {vehicleState.states[vehicleState.states.length - 1].acceleration_pedal}%
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            {/* Top row with 2 seats */}
            <Box display="flex" justifyContent="center">
              {seatbeltOn.slice(0, 2).map((belt, index) => (
                <Paper key={index} className="seat" style={{ backgroundColor: belt ? "blue" : "#bdbdbd" }}>
                  <Typography variant="caption">{belt ? "Belted" : "Unbelted"}</Typography>
                </Paper>
              ))}
            </Box>
            {/* Bottom row with 3 seats */}
            <Box display="flex" justifyContent="center" mt={1}>
              {seatbeltOn.slice(2, 5).map((belt, index) => (
                <Paper key={index + 2} className="seat" style={{ backgroundColor: belt ? "bdbdbd" : "#bdbdbd" }}>
                  <Typography variant="caption">{belt ? "Unbelted" : "Unbelted"}</Typography>
                </Paper>
              ))}
            </Box>
          </Box>
          <Typography className="speedometer">Speed: {speed} km/h</Typography>
          <Typography className="seatbelt-indicator">
            Driver Seatbelt: {accidentData.driver.seatbelt ? "On" : "Off"}
          </Typography>
          <div className={`eye-indicator ${eyesOpen ? "open" : "closed"}`}></div>
          <Typography ml={1}>Driver's Eyes: {eyesOpen ? "Open" : "Closed"}</Typography>
          {vehicleState.states.length > 0 && (
            <Typography>
              Steering Wheel Angle: {vehicleState.states[vehicleState.states.length - 1].steering_wheel_angle}
            </Typography>
          )}
        </>
      )}
    </Box>
    </>
  );
};

export default AccidentSimulation;
