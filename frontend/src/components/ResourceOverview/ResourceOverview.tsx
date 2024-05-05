import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Button,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LocalFireDepartmentIcon from "@material-ui/icons/Fireplace";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import ResourceCreate from "./ResourceCreate";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 800,
    },
    chip: {
      color: "white",
      fontWeight: "bold",
    },
    chipAvailable: {
      backgroundColor: theme.palette.success.main,
    },
    chipEngaged: {
      backgroundColor: theme.palette.warning.main,
    },
    chipMaintenance: {
      backgroundColor: theme.palette.error.main,
    },
    chipOnAssignment: {
      backgroundColor: theme.palette.info.main,
    },
    header: {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    title: {
      padding: theme.spacing(2),
    },
    contactButton: {
      marginLeft: theme.spacing(1),
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

interface Resource {
  id: string;
  type: string;
  status: string;
  location: string; // You will need to adjust based on what "location" actually refers to
  currentLocation: Array<number>; // Assuming this is a lat/long pair
  lastCheck: string; // Format or derive this as needed
  contact: string; // Adjust as needed, e.g., email or phone
  username: string; // Assuming this could be derived from user data
  accidentId: string; // Assuming this is the ID of the accident the resource is assigned to
}

const ResourceOverview: React.FC = () => {
  const classes = useStyles();
  const [resources, setResources] = useState<Resource[]>([]);
  let url =
    process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  // if url is undefined, set it to REACT_APP_PROD_URL
  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data } = await axios.get(`${url}/rescue-unit`); // Use your actual API endpoint
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  const handleContact = (contactInfo: string) => {
    console.log(`Initiating contact with ${contactInfo}`);
  };

  const getStatusChip = (status: string) => {
    const chipClass =
      status === "Available"
        ? classes.chipAvailable
        : status === "Busy"
        ? classes.chipEngaged
        : status === "On the way"
        ? classes.chipOnAssignment // Assuming this maps to your "On the way"
        : null; // Default or error case

    return chipClass && <Chip label={status} className={chipClass} />;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Ambulance":
        return <LocalHospitalIcon className={classes.icon} />;
      case "Fire":
        return <LocalFireDepartmentIcon className={classes.icon} />;
      case "Police":
        return <DirectionsCarIcon className={classes.icon} />;
      default:
        return null; // Default case if type is not matched
    }
  };

  return (
    <>
      <ResourceCreate />
      <Typography variant="h5" component="h2" className={classes.title}>
        Resource Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="resource overview table">
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Status</TableCell>
               <TableCell align="right">Actual AccidentID</TableCell>
              <TableCell align="right">Commander</TableCell>
              <TableCell align="right">Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell component="th" scope="row">
                  {getIcon(resource.type)}
                  {resource.type}
                </TableCell>
                <TableCell align="right">{getStatusChip(resource.status)}</TableCell>
                {resource.accidentId ? <TableCell align="right">{resource.accidentId}</TableCell> : <TableCell align="right">-</TableCell>}
                <TableCell align="right">{resource.username}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<PhoneIcon />}
                    onClick={() => handleContact(resource.contact)}
                    className={classes.contactButton}
                  >
                    Contact
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResourceOverview;
