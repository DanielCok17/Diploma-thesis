// // src/components/AccidentDetailsPanel.tsx
// import React from 'react';
// import { Tabs, Tab, Box, Typography, Card, CardContent } from '@mui/material';
// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
// import SpeedIcon from '@mui/icons-material/Speed';
// import SeatbeltIcon from '@mui/icons-material/AccessibilityNew';
// import WarningIcon from '@mui/icons-material/Warning';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff'; // Example icon for red light violations
// import { Element as ReactElement } from 'react';

// interface ViolationIcons {
//   [key: string]: ReactElement;
// }

// const violationIcons: ViolationIcons = {
//   Speeding: <SpeedIcon color="error" />,
//   'Red Light Violation': <HighlightOffIcon color="secondary" />
// };


// interface Accident {
//   timestamp: Date;
//   last_timestamp_check: Date;
//   acceleration: number;
//   speed: number;
//   license_plates: string[];
//   coordinates: number[];
//   violations: {
//     type: string;
//     coordinates: number[];
//     timestamp: Date;
//   }[];
//   driver: {
//     seatbelt: boolean;
//     drowsiness: boolean;
//     heart_rate: number[];
//   };
//   passengers_num: number;
// }

// interface Props {
//   accident: Accident;
// }

// const accident: Accident = {
//     timestamp: new Date('2024-04-30T15:30:00Z'),
//     last_timestamp_check: new Date('2024-04-30T16:30:00Z'),
//     acceleration: 5.5, // meters per second squared
//     speed: 80, // km/h
//     license_plates: ['ABC123', 'XYZ789'],
//     coordinates: [48.181567, 17.135066],
//     violations: [
//         {
//             type: 'Speeding',
//             coordinates: [48.181567, 17.135064],
//             timestamp: new Date('2024-04-30T15:35:00Z')
//         },
//         {
//             type: 'Red Light Violation',
//             coordinates: [48.181567, 17.135067],
//             timestamp: new Date('2024-04-30T15:40:00Z')
//         }
//     ],
//     driver: {
//         seatbelt: true,
//         drowsiness: false,
//         heart_rate: [72, 75, 70] // Example heart rate readings over time
//     },
//     passengers_num: 3
// };

// const AccidentDetailsPanel = () => {
//   const [selectedTab, setSelectedTab] = React.useState(0);

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <Box>
//       <Tabs value={selectedTab} onChange={handleTabChange} centered>
//         <Tab label="Driver" />
//         <Tab label="Vehicle" />
//         <Tab label="Violations" />
//       </Tabs>
//       {selectedTab === 0 && (
//         <Card>
//           <CardContent>
//             <Typography variant="h6">Driver Information</Typography>
//             <Typography><SeatbeltIcon /> Seatbelt: {accident.driver.seatbelt ? "Yes" : "No"}</Typography>
//             <Typography><WarningIcon /> Drowsiness Detected: {accident.driver.drowsiness ? "Yes" : "No"}</Typography>
//           </CardContent>
//         </Card>
//       )}
//       {selectedTab === 1 && (
//         <Card>
//           <CardContent>
//             <Typography variant="h6">Vehicle Data</Typography>
//             <Typography><SpeedIcon /> Speed: {accident.speed} km/h</Typography>
//             <Typography><SpeedIcon /> Acceleration: {accident.acceleration} m/s²</Typography>
//             {/* More vehicle data as needed */}
//           </CardContent>
//         </Card>
//       )}
//       {selectedTab === 2 && (
//         <Timeline>
//           {accident.violations.map((violation, index) => (
//             <TimelineItem key={index}>
//               <TimelineSeparator>
//                 <TimelineDot color="secondary" />
//                 {index < accident.violations.length - 1 && <TimelineConnector />}
//                 {violationIcons[violation.type] || <SpeedIcon />}  // Use the specific icon or default to SpeedIcon
//               </TimelineSeparator>
//               <TimelineContent>{new Date(violation.timestamp).toLocaleString()}: {violation.type}</TimelineContent>
//             </TimelineItem>
//           ))}
//         </Timeline>
//       )}
//     </Box>
//   );
// };

// export default AccidentDetailsPanel;

// src/components/AccidentDetailsPanel.tsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Card, CardContent } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import SpeedIcon from '@mui/icons-material/Speed';
import SeatbeltIcon from '@mui/icons-material/AccessibilityNew';
import WarningIcon from '@mui/icons-material/Warning';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'; // Icon for red light violations
import { ReactElement } from 'react'; // Correct import for ReactElement

interface ViolationIcons {
  [key: string]: ReactElement;
}

const violationIcons: ViolationIcons = {
  Speeding: <SpeedIcon color="error" />,
  'Red Light Violation': <HighlightOffIcon color="secondary" />
};

interface Accident {
  timestamp: Date;
  last_timestamp_check: Date;
  acceleration: number;
  speed: number;
  license_plates: string[];
  coordinates: number[];
  violations: {
    type: string;
    coordinates: number[];
    timestamp: Date;
  }[];
  driver: {
    seatbelt: boolean;
    drowsiness: boolean;
    heart_rate: number[];
  };
  passengers_num: number;
}

const accident: Accident = {
    timestamp: new Date('2024-04-30T15:30:00Z'),
    last_timestamp_check: new Date('2024-04-30T16:30:00Z'),
    acceleration: 5.5, // meters per second squared
    speed: 80, // km/h
    license_plates: ['ABC123', 'XYZ789'],
    coordinates: [48.181567, 17.135066],
    violations: [
        {
            type: 'Speeding',
            coordinates: [48.181567, 17.135064],
            timestamp: new Date('2024-04-30T15:35:00Z')
        },
        {
            type: 'Red Light Violation',
            coordinates: [48.181567, 17.135067],
            timestamp: new Date('2024-04-30T15:40:00Z')
        }
    ],
    driver: {
        seatbelt: true,
        drowsiness: false,
        heart_rate: [72, 75, 70] // Example heart rate readings over time
    },
    passengers_num: 3
};

const AccidentDetailsPanel = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Driver" />
        <Tab label="Vehicle" />
        <Tab label="Violations" />
      </Tabs>
      {selectedTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6">Driver Information</Typography>
            <Typography><SeatbeltIcon /> Seatbelt: {accident.driver.seatbelt ? "Yes" : "No"}</Typography>
            <Typography><WarningIcon /> Drowsiness Detected: {accident.driver.drowsiness ? "Yes" : "No"}</Typography>
          </CardContent>
        </Card>
      )}
      {selectedTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6">Vehicle Data</Typography>
            <Typography><SpeedIcon /> Speed: {accident.speed} km/h</Typography>
            <Typography><SpeedIcon /> Acceleration: {accident.acceleration} m/s²</Typography>
          </CardContent>
        </Card>
      )}
      {selectedTab === 2 && (
        <Timeline>
          {accident.violations.map((violation, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot>
                  {violationIcons[violation.type] || <SpeedIcon />} 
                </TimelineDot>
                {index < accident.violations.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body2" color="textSecondary">
                  {new Date(violation.timestamp).toLocaleString()}: {violation.type}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </Box>
  );
};

export default AccidentDetailsPanel;

