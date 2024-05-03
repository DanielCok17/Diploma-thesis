import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
type UnitStatus = 'Available' | 'Busy' | 'On the way';

interface RescueUnit {
  type: string;
  status: UnitStatus;
  count: number;
  username: string;
  incidentId?: string;
}

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
  const [units, setUnits] = useState<RescueUnit[]>([]);
  let url = process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }
  
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get<RescueUnit[]>(`${url}/rescue-unit`);
        setUnits(response.data);
      } catch (error) {
        console.error('Failed to fetch units:', error);
      }
    };

    fetchUnits();
  }, []);

  const getStatusChip = (status: UnitStatus, incidentId?: string) => {
    let label = status;
    let className = '';
    switch (status) {
      case 'Available':
        className = classes.chipReady;
        break;
      case 'Busy':
        className = classes.chipBusy;
        label += incidentId ? ` (Incident ID: ${incidentId})` : '';
        break;
      case 'On the way':
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
                primary={`${unit.type} - ${unit.username}`}
                secondary={getStatusChip(unit.status, unit.incidentId)}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RescueUnitsStatus;
