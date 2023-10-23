import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Tooltip } from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CloseIcon from '@mui/icons-material/Close';

interface CarInfo {
  plateNumber: string;
  model: string;
  color: string;
  owner: string;
  accidentDescription: string;
}

const OtherCarsInfo: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<CarInfo | null>(null);

  const carsInAccident: CarInfo[] = [
    {
      plateNumber: 'XYZ 1234',
      model: 'Toyota Corolla',
      color: 'Red',
      owner: 'John Doe',
      accidentDescription: 'Frontal collision with minor damages.',
    },
    {
      plateNumber: 'ABC 5678',
      model: 'Honda Civic',
      color: 'Blue',
      owner: 'Jane Smith',
      accidentDescription: 'Side impact, moderate damages.',
    },
    // ... add more cars if needed
  ];

  return (
    <div>
      <Typography variant="h5" gutterBottom>Accident Report</Typography>
      <div>
        {carsInAccident.map((car, index) => (
          <Card key={index} sx={{ maxWidth: 345, m: 2, display: 'inline-block' }}>
            <CardContent>
              <Typography variant="h6">{car.model}</Typography>
              <Typography color="textSecondary">{car.plateNumber}</Typography>
              <Typography color="textSecondary">{car.color}</Typography>
              <Button variant="outlined" color="primary" onClick={() => setSelectedCar(car)}>View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedCar} onClose={() => setSelectedCar(null)}>
        <DialogTitle>
          Car Details
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setSelectedCar(null)}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar><DriveEtaIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Owner" secondary={selectedCar?.owner} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Model" secondary={selectedCar?.model} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Color" secondary={selectedCar?.color} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Accident Description" secondary={selectedCar?.accidentDescription} />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OtherCarsInfo;
