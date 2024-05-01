// import React from "react";
// import { Box, Grid, Paper, Typography, Button, List, ListItem, ListItemText, Divider, Chip } from "@mui/material";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import AccidentDetails from "../AccidentDetails/AccidentDetails";
// import HeartRateChart from "../HeartRateChart/HeartRateChart";
// import CommunicationPanel from "../CommunicationPanel/CommunicationPanel";
// import CaseResolutionComponent from "../CaseResolutionComponent/CaseResolutionComponent";
// import LiveMap from "../LiveMap/LiveMap";
// import CurrentCases from "../CurrentCases/CurrentCases";

// const RescuerDashboard: React.FC = () => {
//   // Placeholder data for demonstration
//   const assignments = [
//     { title: "Accident on Highway 4", status: "In Progress", time: "09:00 AM" },
//     { title: "Fire in Downtown", status: "Completed", time: "11:00 AM" },
//   ];
//   const notifications = ["Severe weather warning in your area", "New training module available"];
//   const events = [
//     { time: "09:00 AM", description: "Received incident report for Highway 4" },
//     { time: "09:30 AM", description: "Arrived at the scene" },
//     { time: "10:45 AM", description: "Incident contained, begin cleanup" },
//     { time: "11:15 AM", description: "Departed from the scene" },
//   ];

//   const resolveCase = (id: string) => {
//     console.log(`Case with id ${id} resolved`);
//     // Add logic to handle case resolution, like updating state or making an API call
//   };

//   const caseDetailsMock = {
//     id: '1',
//     plateNumber: 'ABC123',
//     model: 'Some Car Model',
//     color: 'Blue',
//     owner: 'John Doe',
//     accidentDescription: 'Frontal collision',
//     title: 'Car Accident on 5th Street' // This is an example title
//   };

//   return (
//     <>
//       <Box display="flex" justifyContent="center" p={2}>
//       <Box flex={3} p={1}> {/* Zvýšená flex báza pre mapu */}
//         <LiveMap />
//       </Box>
//       <Box flex={1} p={1}> {/* Menšia flex báza pre zoznam prípadov */}
//         {/* <CurrentCases /> */}
//         <Typography variant="h4" gutterBottom>
//           Rescuer Dashboard
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6">Current Assignments</Typography>
//               <List>
//                 {assignments.map((assignment, index) => (
//                   <React.Fragment key={index}>
//                     <ListItem>
//                       <ListItemText
//                         primary={assignment.title}
//                         secondary={`Status: ${assignment.status} - ${assignment.time}`}
//                       />
//                       <Chip
//                         label={assignment.status}
//                         color={assignment.status === "In Progress" ? "primary" : "success"}
//                       />
//                     </ListItem>
//                     <Divider />
//                   </React.Fragment>
//                 ))}
//               </List>
//               <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//                 Update Status
//               </Button>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6">Notifications</Typography>
//               <List>
//                 {notifications.map((notification, index) => (
//                   <ListItem key={index}>
//                     <ListItemText primary={notification} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//       <Box sx={{ flexGrow: 1, p: 2 }}>

//       </Box>
//       <AccidentDetails />
//       {/* <HeartRateChart /> */}
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Typography variant="h4" gutterBottom>
//           Heart Rate Monitoring
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={20} md={20}>
//             <HeartRateChart />
//           </Grid>
//           <Grid item xs={20} md={20}>
//             <HeartRateChart />
//           </Grid>
//           <Grid item xs={20} md={20}>
//             <HeartRateChart />
//           </Grid>
//         </Grid>
//       </Box>
//       <CaseResolutionComponent caseDetails={caseDetailsMock} onResolve={resolveCase} />
//       <CommunicationPanel />
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Grid item xs={12}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6">Event Timeline</Typography>
//             <Timeline position="alternate">
//               {events.map((event, index) => (
//                 <TimelineItem key={index}>
//                   <TimelineSeparator>
//                     <TimelineDot color="primary" />
//                     {index < events.length - 1 && <TimelineConnector />}
//                   </TimelineSeparator>
//                   <TimelineContent>{`${event.time} - ${event.description}`}</TimelineContent>
//                 </TimelineItem>
//               ))}
//             </Timeline>
//           </Paper>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default RescuerDashboard;

import React from "react";
import { Box, Grid, Paper, Typography, Button, List, ListItem, ListItemText, Divider, Chip } from "@mui/material";
import LiveMap from "../LiveMap/LiveMap";
import AccidentList from "../AccidentList/AccidentList";
import RescueUnitsStatus from "../RescueUnitsStatus/RescueUnitsStatus";

const RescuerDashboard: React.FC = () => {
  const dummyAccidents = [
    // Dummy data, replace with actual data retrieved from backend
    {
      _id: "1",
      timestamp: new Date(),
      vin: "1HGCM82633A004352",
      last_timestamp_check: new Date(),
      acceleration: 5,
      speed: 120,
      license_plates: ["XYZ 1234"],
      coordinates: [34.0522, -118.2437],
      violations: [],
      driver: {
        seatbelt: true,
        drowsiness: false,
        heart_rate: [72, 76, 75],
      },
      passengers_num: 3,
    },
    {
      _id: "2",
      timestamp: new Date(),
      vin: "1HGCM82633A004352",
      last_timestamp_check: new Date(),
      acceleration: 5,
      speed: 120,
      license_plates: ["XYZ 1234"],
      coordinates: [34.0522, -118.2437],
      violations: [],
      driver: {
        seatbelt: true,
        drowsiness: false,
        heart_rate: [72, 76, 75],
      },
      passengers_num: 3,
    },
  ];

  return (
    <>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Main content area with map and accident list */}
        {/* <Box sx={{ display: 'flex', flex: '1 1 auto' }}>
        <Box sx={{ flex: 4, p: 4 }}>
          <LiveMap />
        </Box>
        <Box sx={{ flex: 2, p: 2, overflowY: 'auto' }}>
          <AccidentList accidents={dummyAccidents} />
        </Box>
      </Box> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on medium and up
            flex: "1 1 auto",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "70%" }, // Full width on small screens, 70% on medium and up
              p: { xs: 1, sm: 2, md: 4 }, // Adjust padding based on screen size
            }}
          >
            <LiveMap />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "30%" }, // Full width on small screens, 30% on medium and up
              p: { xs: 1, sm: 2, md: 2 }, // Adjust padding based on screen size
              overflowY: "auto",
              maxHeight: { xs: "300px", sm: "400px", md: "none" }, // Set a max height for mobile and tablet, none for desktop
            }}
          >
            <AccidentList accidents={dummyAccidents} />
          </Box>
        </Box>

        {/* Separate row for Rescue Units Status, positioned at the bottom */}
        <Box sx={{ p: 2 }}>
          <RescueUnitsStatus />
        </Box>
      </Box>
    </>
  );
};

export default RescuerDashboard;
