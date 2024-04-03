import React from "react";
import { Box, Grid, Paper, Typography, Button, List, ListItem, ListItemText, Divider, Chip } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AccidentDetails from "../AccidentDetails/AccidentDetails";
import HeartRateChart from "../HeartRateChart/HeartRateChart";
import CommunicationPanel from "../CommunicationPanel/CommunicationPanel";
import CaseResolutionComponent from "../CaseResolutionComponent/CaseResolutionComponent";
import LiveMap from "../LiveMap/LiveMap";

const RescuerDashboard: React.FC = () => {
  // Placeholder data for demonstration
  const assignments = [
    { title: "Accident on Highway 4", status: "In Progress", time: "09:00 AM" },
    { title: "Fire in Downtown", status: "Completed", time: "11:00 AM" },
  ];
  const notifications = ["Severe weather warning in your area", "New training module available"];
  const events = [
    { time: "09:00 AM", description: "Received incident report for Highway 4" },
    { time: "09:30 AM", description: "Arrived at the scene" },
    { time: "10:45 AM", description: "Incident contained, begin cleanup" },
    { time: "11:15 AM", description: "Departed from the scene" },
  ];

  const resolveCase = (id: string) => {
    console.log(`Case with id ${id} resolved`);
    // Add logic to handle case resolution, like updating state or making an API call
  };

  const caseDetailsMock = {
    id: '1',
    plateNumber: 'ABC123',
    model: 'Some Car Model',
    color: 'Blue',
    owner: 'John Doe',
    accidentDescription: 'Frontal collision',
    title: 'Car Accident on 5th Street' // This is an example title
  };

  return (
    <>
          <LiveMap  />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Rescuer Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Current Assignments</Typography>
              <List>
                {assignments.map((assignment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={assignment.title}
                        secondary={`Status: ${assignment.status} - ${assignment.time}`}
                      />
                      <Chip
                        label={assignment.status}
                        color={assignment.status === "In Progress" ? "primary" : "success"}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Update Status
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Notifications</Typography>
              <List>
                {notifications.map((notification, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={notification} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <AccidentDetails />
      {/* <HeartRateChart /> */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
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
          <Grid item xs={20} md={20}>
            <HeartRateChart />
          </Grid>
        </Grid>
      </Box>
      <CaseResolutionComponent caseDetails={caseDetailsMock} onResolve={resolveCase} />
      <CommunicationPanel />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Event Timeline</Typography>
            <Timeline position="alternate">
              {events.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    {index < events.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>{`${event.time} - ${event.description}`}</TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
        </Grid>
      </Box>
    </>
  );
};

export default RescuerDashboard;
