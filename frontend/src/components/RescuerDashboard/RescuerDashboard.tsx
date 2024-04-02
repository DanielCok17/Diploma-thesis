import React from 'react';
import { Box, Grid, Paper, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const RescuerDashboard: React.FC = () => {
  // Placeholder data for demonstration
  const assignments = ['Accident on Highway 4', 'Fire in Downtown'];
  const notifications = ['Severe weather warning in your area'];

  return (
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
                    <ListItemText primary={assignment} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Button variant="contained" color="primary">
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
  );
};

export default RescuerDashboard;
