
// src/components/AccidentDetailsPanel.tsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Card, CardContent, styled } from '@mui/material';
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
  status?: string;
}


const TabPanel = styled('div')<{ index: number; value: number }>(
  ({ index, value }) => ({
    display: index === value ? 'block' : 'none',
  }),
);


const AccidentDetailsPanel: React.FC<{ accident: Accident }> = ({ accident }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
    {/* Driver Information */}
    <Card sx={{ flexBasis: '30%' }}>
      <CardContent>
        <Typography variant="h6">Driver Information</Typography>
        <Typography><SeatbeltIcon /> Seatbelt: {accident.driver.seatbelt ? "Yes" : "No"}</Typography>
        <Typography><WarningIcon /> Drowsiness Detected: {accident.driver.drowsiness ? "Yes" : "No"}</Typography>
      </CardContent>
    </Card>

    {/* Vehicle Data */}
    <Card sx={{ flexBasis: '30%' }}>
      <CardContent>
        <Typography variant="h6">Vehicle Data</Typography>
        <Typography><SpeedIcon /> Speed: {accident.speed} km/h</Typography>
        <Typography><SpeedIcon /> Acceleration: {accident.acceleration} m/s²</Typography>
      </CardContent>
    </Card>

    {/* Violations Timeline */}
    <Card sx={{ flexBasis: '30%' }}>
      <CardContent>
        <Typography variant="h6">Violations</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>

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
        </Box>
      </CardContent>
    </Card>
  </Box>
  );
};

export default AccidentDetailsPanel;

