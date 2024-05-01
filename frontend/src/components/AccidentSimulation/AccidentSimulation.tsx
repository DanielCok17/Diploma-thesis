// // // src/components/AccidentSimulation.tsx
// // import React, { useState, useEffect } from 'react';
// // import { Box, Typography } from '@mui/material';
// // import { styled } from '@mui/system';

// // const Wheel = styled(Box)({
// //   width: '150px',
// //   height: '150px',
// //   borderRadius: '50%',
// //   border: '5px solid black',
// //   display: 'flex',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   transform: 'rotate(0deg)',
// //   transition: 'transform 0.5s ease-in-out',
// // });

// // const Speedometer = styled(Typography)({
// //   fontSize: '2em',
// // });

// // const SeatbeltIndicator = styled(Typography)(({ theme }) => ({
// //   color: theme.palette.error.main,
// //   fontSize: '1.5em',
// // }));

// // const AccidentSimulation: React.FC = () => {
// //   const [speed, setSpeed] = useState(0);
// //   const [wheelRotation, setWheelRotation] = useState(0);
// //   const [seatbeltOn, setSeatbeltOn] = useState(false);

// //   // Simulate accident data changes
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setSpeed((prevSpeed) => (prevSpeed >= 80 ? 0 : prevSpeed + 20));
// //       setWheelRotation((prevRotation) => (prevRotation >= 90 ? -90 : prevRotation + 45));
// //       setSeatbeltOn((prevSeatbeltOn) => !prevSeatbeltOn);
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <>
// //     <Box>
// //       <Wheel sx={{ transform: `rotate(${wheelRotation}deg)` }}>
// //         <Typography>Wheel</Typography>
// //       </Wheel>
// //       <Speedometer>Speed: {speed} km/h</Speedometer>
// //       <SeatbeltIndicator>
// //         Seatbelt: {seatbeltOn ? 'On' : 'Off'}
// //       </SeatbeltIndicator>
// //     </Box>

// //     </>
// //   );
// // };

// // export default AccidentSimulation;

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { styled } from '@mui/system';

// const Wheel = styled(Box)({
//   width: '150px',
//   height: '150px',
//   borderRadius: '50%',
//   border: '5px solid black',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
//   position: 'relative',
//   transition: 'transform 0.5s ease-in-out',
// });

// const Pedal = styled(Box)({
//   width: '20px',
//   height: '80px',
//   backgroundColor: 'gray',
//   position: 'absolute',
//   bottom: '10px',
// });

// const GasPedal = styled(Pedal)({
//   left: '30px',
// });

// const BrakePedal = styled(Pedal)({
//   right: '30px',
// });

// const Speedometer = styled(Typography)({
//   fontSize: '1.5em',
//   marginTop: '1em',
// });

// const SeatbeltIndicator = styled(Typography)(({ theme }) => ({
//   color: theme.palette.error.main,
//   fontSize: '1.5em',
//   marginTop: '1em',
// }));

// const AccidentSimulation: React.FC = () => {
//   const [speed, setSpeed] = useState(0);
//   const [wheelRotation, setWheelRotation] = useState(0);
//   const [seatbeltOn, setSeatbeltOn] = useState(false);
//   const [gasPedalPressed, setGasPedalPressed] = useState(false);
//   const [brakePedalPressed, setBrakePedalPressed] = useState(false);

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

//     const interval = setInterval(() => {
//       setSpeed((prevSpeed) => (prevSpeed >= 80 ? 0 : prevSpeed + 20));
//       setWheelRotation((prevRotation) => (prevRotation >= 90 ? -90 : prevRotation + 45));
//       setSeatbeltOn((prevSeatbeltOn) => !prevSeatbeltOn);
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//       clearTimeout(gasPedalTimeout);
//       clearTimeout(brakePedalTimeout);
//     };
//   }, []);

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <Box position="relative">
//         <Typography variant="h6" gutterBottom>
//           Wheel
//         </Typography>
//         <Wheel style={{ transform: `rotate(${wheelRotation}deg)` }}>
//           {speed > 0 ? <CircularProgress variant="determinate" value={speed / 80 * 100} size={120} /> : <Typography variant="body1">Stopped</Typography>}
//         </Wheel>
//         <GasPedal style={{ backgroundColor: gasPedalPressed ? 'green' : 'gray' }} />
//         <BrakePedal style={{ backgroundColor: brakePedalPressed ? 'red' : 'gray' }} />
//       </Box>
//       <Speedometer>Speed: {speed} km/h</Speedometer>
//       <SeatbeltIndicator>
//         Seatbelt: {seatbeltOn ? 'On' : 'Off'}
//       </SeatbeltIndicator>
//     </Box>
//   );
// };

// export default AccidentSimulation;

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, CircularProgress, Paper } from '@mui/material';
// import { styled } from '@mui/system';

// const Wheel = styled(Box)({
//   width: '150px',
//   height: '150px',
//   borderRadius: '50%',
//   border: '5px solid black',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
//   position: 'relative',
//   transition: 'transform 0.5s ease-in-out',
// });

// const Pedal = styled(Box)({
//   width: '20px',
//   height: '80px',
//   backgroundColor: 'gray',
//   position: 'absolute',
//   bottom: '10px',
// });

// const GasPedal = styled(Pedal)({
//   left: '30px',
// });

// const BrakePedal = styled(Pedal)({
//   right: '30px',
// });

// const Seat = styled(Paper)(({ theme }) => ({
//   width: '80px',
//   height: '80px',
//   backgroundColor: theme.palette.grey[200],
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   margin: '5px',
// }));

// const EyeIndicator = styled('div', {
//   shouldForwardProp: (prop) => prop !== 'open'
// })<EyeIndicatorProps>(({ open, theme }) => ({
  
//   width: '10px',
//   height: '10px',
//   borderRadius: '50%',
//   backgroundColor: open ? 'green' : 'red',
//   border: `1px solid ${theme.palette.divider}`,
// }));

// const Speedometer = styled(Typography)({
//   fontSize: '1.5em',
//   marginTop: '1em',
// });

// const SeatbeltIndicator = styled(Typography)(({ theme }) => ({
//   color: theme.palette.error.main,
//   fontSize: '1.5em',
//   marginTop: '1em',
// }));

// // Define a type that includes the custom properties you want to use
// interface EyeIndicatorProps {
//   open: boolean;  // Your custom property
// }

// const AccidentSimulation: React.FC = () => {
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
//       {/* <Box position="relative">
//         <Wheel style={{ transform: `rotate(${wheelRotation}deg)` }}>
//           <Typography variant="caption">Wheel</Typography>
//         </Wheel>
//         <GasPedal style={{ backgroundColor: gasPedalPressed ? 'green' : 'gray' }} />
//         <BrakePedal style={{ backgroundColor: brakePedalPressed ? 'red' : 'gray' }} />
//       </Box> */}
//  <Box position="relative">
//   <Wheel style={{ transform: `rotate(${wheelRotation}deg)` }}>
//     <Typography variant="caption">Wheel</Typography>
//   </Wheel>
//   {/* Positioning Brake Pedal on the left and further from the center */}
//   <Box position="absolute" bottom="-90px" left="10%"> {/* Moved to left and adjusted the offset */}
//     <BrakePedal style={{ backgroundColor: brakePedalPressed ? 'red' : 'gray' }}>
//       <Typography variant="caption" textAlign="center">Brake</Typography>
//     </BrakePedal>
//   </Box>
//   {/* Positioning Gas Pedal on the right and further from the center */}
//   <Box position="absolute" bottom="-90px" right="10%"> {/* Moved to right and adjusted the offset */}
//     <GasPedal style={{ backgroundColor: gasPedalPressed ? 'green' : 'gray' }}>
//       <Typography variant="caption" textAlign="center">Gas</Typography>
//     </GasPedal>
//   </Box>
// </Box>
// <Box display="flex" flexDirection="column" alignItems="center" mt={10}> {/* Increased the top margin */}

//        <Box display="flex" justifyContent="center" mt={2}>
//     {seatbeltOn.slice(0, 2).map((belt, index) => (
//     <Seat key={index} elevation={3} sx={{ margin: '0 50px' }}> {/* Adjusted margin here */}
//     <Typography variant="caption">{belt ? 'Belted' : 'Unbelted'}</Typography>
//       </Seat>
//     ))}
//   </Box>
//   <Box display="flex" justifyContent="center" mt={2}>
//     {seatbeltOn.slice(2).map((belt, index) => (
//       <Seat key={index} elevation={3}>
//         <Typography variant="caption">{belt ? 'Belted' : 'Unbelted'}</Typography>
//       </Seat>
//     ))}
//   </Box>
//       <Box display="flex" justifyContent="center" mt={2}>
//         <EyeIndicator open={eyesOpen} />
//         <Typography ml={1}>Driver's Eyes: {eyesOpen ? 'Open' : 'Closed'}</Typography>
//       </Box>
//       <Speedometer>Speed: {speed} km/h</Speedometer>
//       <SeatbeltIndicator>
//         Driver Seatbelt: {seatbeltOn[0] ? 'On' : 'Off'}
//       </SeatbeltIndicator>
//     </Box>
//     </Box>

//   );
// };

// export default AccidentSimulation;

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import './AccidentSimulation.css';

interface EyeIndicatorProps {
  open: boolean;
}

const AccidentSimulation: React.FC = () => {
  const [speed, setSpeed] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [seatbeltOn, setSeatbeltOn] = useState([false, false, false, false, false]);
  const [gasPedalPressed, setGasPedalPressed] = useState(false);
  const [brakePedalPressed, setBrakePedalPressed] = useState(false);
  const [eyesOpen, setEyesOpen] = useState(true);

  useEffect(() => {
    const gasPedalTimeout = setTimeout(() => {
      setGasPedalPressed(true);
      setTimeout(() => {
        setGasPedalPressed(false);
      }, 3000);
    }, 1000);

    const brakePedalTimeout = setTimeout(() => {
      setBrakePedalPressed(true);
      setTimeout(() => {
        setBrakePedalPressed(false);
      }, 3000);
    }, 2000);

    const eyesTimeout = setTimeout(() => {
      setEyesOpen(false);
      setTimeout(() => {
        setEyesOpen(true);
      }, 500);
    }, 5000);

    const interval = setInterval(() => {
      setSpeed((prevSpeed) => (prevSpeed >= 100 ? 0 : prevSpeed + 20));
      setWheelRotation((prevRotation) => (prevRotation >= 180 ? -180 : prevRotation + 90));
      setSeatbeltOn(seatbeltOn.map(belt => !belt));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(gasPedalTimeout);
      clearTimeout(brakePedalTimeout);
      clearTimeout(eyesTimeout);
    };
  }, [seatbeltOn]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box position="relative" className="wheel" style={{ transform: `rotate(${wheelRotation}deg)` }}>
        <Typography variant="caption">Wheel</Typography>
      </Box>
      <Box position="absolute" bottom="-90px" left="10%" className="brake-pedal">
        <Typography variant="caption" textAlign="center" style={{ backgroundColor: brakePedalPressed ? 'red' : 'gray' }}>Brake</Typography>
      </Box>
      <Box position="absolute" bottom="-90px" right="10%" className="gas-pedal">
        <Typography variant="caption" textAlign="center" style={{ backgroundColor: gasPedalPressed ? 'green' : 'gray' }}>Gas</Typography>
      </Box>
      {/* {seatbeltOn.map((belt, index) => (
        <Paper key={index} className="seat">
          <Typography variant="caption">{belt ? 'Belted' : 'Unbelted'}</Typography>
        </Paper>
      ))} */}
       <Box display="flex" justifyContent="center" mt={2}>
    {seatbeltOn.slice(0, 2).map((belt, index) => (
      <Paper key={index} className="seat">
        <Typography variant="caption">{belt ? 'Belted' : 'Unbelted'}</Typography>
      </Paper>
    ))}
  </Box>
  {/* Displaying the remaining three seats */}
  <Box display="flex" justifyContent="center" mt={2}>
    {seatbeltOn.slice(2).map((belt, index) => (
      <Paper key={index + 2} className="seat"> {/* Ensure unique keys by adjusting the index */}
        <Typography variant="caption">{belt ? 'Belted' : 'Unbelted'}</Typography>
      </Paper>
    ))}
  </Box>
      <div className={`eye-indicator ${eyesOpen ? 'open' : 'closed'}`}></div>
      <Typography ml={1}>Driver's Eyes: {eyesOpen ? 'Open' : 'Closed'}</Typography>
      <Typography className="speedometer">Speed: {speed} km/h</Typography>
      <Typography className="seatbelt-indicator">
        Driver Seatbelt: {seatbeltOn[0] ? 'On' : 'Off'}
      </Typography>
    </Box>
  );
};

export default AccidentSimulation;

