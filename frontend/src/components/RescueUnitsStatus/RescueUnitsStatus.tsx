import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, red, yellow } from "@material-ui/core/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define types
type UnitStatus = "Available" | "Busy" | "On the way";

interface RescueUnit {
  type: string;
  status: UnitStatus;
  count: number;
  username: string;
  accidentId?: string;
}

// Use makeStyles hook to create classes
const useStyles = makeStyles({
  card: {
    margin: "1rem",
  },
  avatar: {
    color: "#fff",
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
  const navigate = useNavigate();
  let url =
    process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get<RescueUnit[]>(`${url}/rescue-unit`);
        setUnits(response.data);
      } catch (error) {
        console.error("Failed to fetch units:", error);
      }
    };

    fetchUnits();
  }, []);

  const getStatusChip = (status: UnitStatus, accidentId?: string) => {
    let label = status;
    let className = "";
    switch (status) {
      case "Available":
        className = classes.chipReady;
        break;
      case "Busy":
        className = classes.chipBusy;
        label += accidentId ? ` (Incident ID: ${accidentId})` : "";
        break;
      case "On the way":
        className = classes.chipUnavailable;
        break;
    }
    return <Chip label={label} className={className} size="small" />;
  };

  const navigateToIncident = (accidentId: string) => {
    navigate("/accident-details/" + accidentId);
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
                <Avatar className={classes.avatar}>{/* You can use icons for different types of units here */}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${unit.type} - ${unit.username}`}
                secondary={getStatusChip(unit.status, unit.accidentId)}
              />
              {unit.accidentId && ( // Check if accidentId is not null
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => navigateToIncident(unit.accidentId ? unit.accidentId : "")} // Call the bound function
                >
                  Show Details
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RescueUnitsStatus;
