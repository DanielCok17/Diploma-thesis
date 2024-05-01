import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green, red, yellow } from '@material-ui/core/colors';

// Define types
type UnitStatus = 'Ready' | 'Busy' | 'Unavailable';

interface RescueUnit {
    type: string; 
  status: UnitStatus;
  count: number;
  commander: string;
  incidentId?: string;
}

// Prepare the units array with data
const units: RescueUnit[] = [
    {
        type: 'Emergency 1',
        status: 'Ready',
        count: 1,
        commander: 'John Doe',
      },
      {
        type: 'Emergency 2',
        status: 'Busy',
        count: 1,
        commander: 'Emily Roe',
        incidentId: 'INC-001',
      },
      // ... you can add more Emergency units as needed
      {
        type: 'Police 1',
        status: 'Busy',
        count: 2,
        commander: 'Jane Doe',
        incidentId: 'INC-123',
      },
      {
        type: 'Firefighters 1',
        status: 'Unavailable',
        count: 1,
        commander: 'John Smith',
      },
      {
        type: 'Firefighters 2',
        status: 'Ready',
        count: 3,
        commander: 'Jane Smith',
      },
        // ... you can add more Firefighters units as needed
        {
            type: 'Police 2',
            status: 'Ready',
            count: 1,
            commander: 'John Johnson',
        },
        {
            type: 'Police 3',
            status: 'Ready',
            count: 2,
            commander: 'Jane Johnson',
        },
];

// Use makeStyles hook to create classes
const useStyles = makeStyles({
  card: {
    margin: '1rem',
  },
  avatar: {
    color: '#fff',
  },
  chipReady: {
    color: green[600],
    borderColor: green[600],
  },
  chipBusy: {
    color: yellow[800],
    borderColor: yellow[800],
  },
  chipUnavailable: {
    color: red[600],
    borderColor: red[600],
  },
});

const RescueUnitsStatus: React.FC = () => {
  const classes = useStyles();

  const getStatusChip = (status: UnitStatus, incidentId?: string) => {
    let label = status;
    let className = '';
    switch (status) {
      case 'Ready':
        className = classes.chipReady;
        break;
      case 'Busy':
        className = classes.chipBusy;
        label += incidentId ? ` (Incident ID: ${incidentId})` : '';
        break;
      case 'Unavailable':
        className = classes.chipUnavailable;
        break;
    }
    return <Chip label={label} className={className} size="small" />;
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Status of Each Rescue Unit
        </Typography>
        <Divider />
        <List>
          {units.map((unit, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  {/* You can use icons for different types of units here */}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${unit.type} - Commander: ${unit.commander}`}
                secondary={
                  <>
                    {getStatusChip(unit.status, unit.incidentId)}
                    {/* <Typography component="span" color="textSecondary">
                      {` | Personnel: ${unit.count}`}
                    </Typography> */}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RescueUnitsStatus;
