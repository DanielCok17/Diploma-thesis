import React, { useState } from 'react';
import { List, ListItem, ListItemText, Card, CardContent, Typography } from '@mui/material';
import { passengers, passengerDetails } from './data';

const PassengerInfo: React.FC = () => {
  const [selectedPassenger, setSelectedPassenger] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedPassenger(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* Passenger List */}
      <List style={{ width: '50%', borderRight: '1px solid gray' }}>
        {passengers.map((passenger) => (
          <ListItem key={passenger.id} button onClick={() => handleClick(passenger.id)}>
            <ListItemText primary={passenger.name} secondary={passenger.healthStatus} />
          </ListItem>
        ))}
      </List>

      {/* Passenger Details */}
      {selectedPassenger && (
        <Card style={{ width: '50%', padding: '16px' }}>
          <CardContent>
            <Typography variant="h5">{passengerDetails[selectedPassenger]?.name}</Typography>
            <Typography>Heart Rate: {passengerDetails[selectedPassenger]?.heartRate}</Typography>
            <Typography>Oxygen Level: {passengerDetails[selectedPassenger]?.oxygenLevel}</Typography>
            <Typography>Injury Details: {passengerDetails[selectedPassenger]?.injuryDetails}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PassengerInfo;