// Import necessary libraries
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const RescueStatus: React.FC = () => {
  // Example data
  const operations = [
    { id: 1, location: 'ABC Road', units: 3, eta: '10 mins' },
    { id: 2, location: 'DEF Highway', units: 2, eta: '15 mins' },
    // ... other operations
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Location</TableCell>
          <TableCell>Units Deployed</TableCell>
          <TableCell>ETA</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {operations.map(operation => (
          <TableRow key={operation.id}>
            <TableCell>{operation.location}</TableCell>
            <TableCell>{operation.units}</TableCell>
            <TableCell>{operation.eta}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RescueStatus;
