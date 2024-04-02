import React from 'react';
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
  Typography
} from '@material-ui/core';

interface Incident {
  id: number;
  timestamp: string;
  type: string;
  location: string;
  status: string;
  description: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 1000, // A wider table to fit all the data
    },
    header: {
      background: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    title: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
);

const IncidentLog: React.FC = () => {
  const classes = useStyles();

  // Mock data for incidents
  const incidents: Incident[] = [
    {
      id: 1,
      timestamp: new Date().toISOString(),
      type: 'Fire',
      location: '123 Main St',
      status: 'Active',
      description: 'Small fire reported in a residential building.',
    },
    // ...additional mock incidents
  ];

  return (
    <>
      <Typography variant="h6" component="h3" className={classes.title}>
        Incident Log
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="incident log table">
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date/Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell component="th" scope="row">{incident.id}</TableCell>
                <TableCell>{incident.timestamp}</TableCell>
                <TableCell>{incident.type}</TableCell>
                <TableCell>{incident.location}</TableCell>
                <TableCell>{incident.status}</TableCell>
                <TableCell>{incident.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default IncidentLog;
