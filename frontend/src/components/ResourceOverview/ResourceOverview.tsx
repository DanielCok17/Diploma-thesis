// import React from 'react';
// import {
//   makeStyles,
//   Theme,
//   createStyles,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Chip,
// } from '@material-ui/core';

// interface Resource {
//   id: number;
//   type: string;
//   quantity: number; // Added quantity field
//   status: 'Available' | 'Engaged' | 'Maintenance';
//   location: string;
//   lastCheck: string; // Added last check field for additional info
// }

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     table: {
//       minWidth: 750, // Increased table width for better presentation
//     },
//     chip: {
//       color: 'white',
//       fontWeight: 'bold',
//     },
//     chipAvailable: {
//       backgroundColor: theme.palette.success.main,
//     },
//     chipEngaged: {
//       backgroundColor: theme.palette.warning.main,
//     },
//     chipMaintenance: {
//       backgroundColor: theme.palette.error.main,
//     },
//     header: {
//       background: theme.palette.primary.main,
//       color: theme.palette.common.white,
//     },
//     title: {
//       padding: theme.spacing(2),
//     },
//   }),
// );

// const ResourceOverview: React.FC = () => {
//   const classes = useStyles();

//   const resources: Resource[] = [
//     // Added more detailed mock data
//     { id: 1, type: 'Ambulance', quantity: 5, status: 'Available', location: 'Station 1', lastCheck: '10 min ago' },
//     { id: 2, type: 'Fire Truck', quantity: 2, status: 'Engaged', location: 'Field Operation', lastCheck: '20 min ago' },
//     { id: 3, type: 'Utility Vehicle', quantity: 3, status: 'Maintenance', location: 'Garage', lastCheck: '1 hr ago' },
//     // Add more resources as needed
//   ];

//   const getStatusChip = (status: string) => {
//     const style =
//       status === 'Available'
//         ? classes.chipAvailable
//         : status === 'Engaged'
//         ? classes.chipEngaged
//         : classes.chipMaintenance;

//     return <Chip label={status} className={`${classes.chip} ${style}`} />;
//   };
//   return (
//     <>
//       <Typography variant="h5" component="h2" className={classes.title}>
//         Resource Overview
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="resource overview table">
//           <TableHead className={classes.header}>
//             <TableRow>
//               <TableCell>Type</TableCell>
//               <TableCell align="right">Quantity</TableCell>
//               <TableCell align="right">Status</TableCell>
//               <TableCell align="right">Location</TableCell>
//               <TableCell align="right">Last Check</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {resources.map((resource) => (
//               <TableRow key={resource.id}>
//                 <TableCell component="th" scope="row">
//                   {resource.type}
//                 </TableCell>
//                 <TableCell align="right">{resource.quantity}</TableCell>
//                 <TableCell align="right">{getStatusChip(resource.status)}</TableCell>
//                 <TableCell align="right">{resource.location}</TableCell>
//                 <TableCell align="right">{resource.lastCheck}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default ResourceOverview;

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
  Typography,
  Chip,
  Button,
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';

interface Resource {
  id: number;
  type: string;
  quantity: number;
  status: 'Available' | 'Engaged' | 'Maintenance' | 'On Assignment';
  location: string;
  lastCheck: string;
  contact: string; // Contact information, such as a phone number or radio channel
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 800,
    },
    chip: {
      color: 'white',
      fontWeight: 'bold',
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
  }),
);

const ResourceOverview: React.FC = () => {
  const classes = useStyles();

  const resources: Resource[] = [
    { id: 1, type: 'Ambulance', quantity: 5, status: 'Available', location: 'Station 1', lastCheck: '10 min ago', contact: 'Phone: 123-456-7890' },
    { id: 2, type: 'Fire Truck', quantity: 2, status: 'Engaged', location: 'Field Operation', lastCheck: '20 min ago', contact: 'Phone: 123-456-7891' },
    { id: 3, type: 'Utility Vehicle', quantity: 3, status: 'Maintenance', location: 'Garage', lastCheck: '1 hr ago', contact: 'Phone: 123-456-7892' },
    { id: 4, type: 'Search Team', quantity: 2, status: 'On Assignment', location: 'Remote Area', lastCheck: '30 min ago', contact: 'Radio Channel 16' },
    { id: 5, type: 'Rescue Boat', quantity: 1, status: 'Available', location: 'Dock', lastCheck: '5 min ago', contact: 'Phone: 123-456-7893'}
  ];

  const handleContact = (contactInfo: string) => {
    console.log(`Initiating contact with ${contactInfo}`);
    // Here you can implement the actual communication logic, such as opening a dialer, radio, or sending a message
  };

  const getStatusChip = (status: string) => {
    const chipClass = 
      status === 'Available' ? classes.chipAvailable :
      status === 'Engaged' ? classes.chipEngaged :
      status === 'Maintenance' ? classes.chipMaintenance :
      classes.chipOnAssignment;

    return <Chip label={status} className={`${classes.chip} ${chipClass}`} />;
  };

  return (
    <>
      <Typography variant="h5" component="h2" className={classes.title}>
        Resource Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="resource overview table">
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Last Check</TableCell>
              <TableCell align="right">Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell component="th" scope="row">{resource.type}</TableCell>
                <TableCell align="right">{resource.quantity}</TableCell>
                <TableCell align="right">{getStatusChip(resource.status)}</TableCell>
                <TableCell align="right">{resource.location}</TableCell>
                <TableCell align="right">{resource.lastCheck}</TableCell>
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

