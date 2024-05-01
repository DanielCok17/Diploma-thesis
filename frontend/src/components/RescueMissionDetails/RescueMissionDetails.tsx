import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FireTruckIcon from '@mui/icons-material/Whatshot'; // Ikonka pre hasičov (zmeniť na správny symbol, ak existuje)
import PoliceIcon from '@mui/icons-material/LocalPolice'; // Ikonka pre políciu (zmeniť na správny symbol, ak existuje)
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// Toto by boli skutočné dáta prichádzajúce napríklad z props alebo kontextu
const missionData = {
  commander: 'Jozek Mak',
  units: [
    { type: 'Ambulance', icon: LocalHospitalIcon },
    { type: 'Fire Truck', icon: FireTruckIcon },
    { type: 'Police Car', icon: PoliceIcon },
    // ďalšie jednotky podľa potreby...
  ],
};

const RescueMissionDetails: React.FC = () => {
  return (
    <Paper sx={{ p: 2, marginTop: 2, backgroundColor: '#f3f3f3' }}>
      <Typography variant="h5" gutterBottom>
        Rescue Mission Details
      </Typography>
      <Typography variant="subtitle1">Commander:</Typography>
      <Typography variant="body1" gutterBottom>
        {missionData.commander}
      </Typography>
      <Typography variant="subtitle1">Responding Units:</Typography>
      <List>
        {missionData.units.map((unit, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <unit.icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={unit.type} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RescueMissionDetails;
