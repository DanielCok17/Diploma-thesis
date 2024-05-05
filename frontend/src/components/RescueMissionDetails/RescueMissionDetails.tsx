// import React from 'react';
// import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
// import FireTruckIcon from '@mui/icons-material/Whatshot'; // Ikonka pre hasičov (zmeniť na správny symbol, ak existuje)
// import PoliceIcon from '@mui/icons-material/LocalPolice'; // Ikonka pre políciu (zmeniť na správny symbol, ak existuje)
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// // Toto by boli skutočné dáta prichádzajúce napríklad z props alebo kontextu
// const missionData = {
//   commander: 'Jozek Mak',
//   units: [
//     { type: 'Ambulance', icon: LocalHospitalIcon },
//     { type: 'Fire Truck', icon: FireTruckIcon },
//     { type: 'Police Car', icon: PoliceIcon },
//   ],
// };

// interface Props {
//   accidentId: string;
// }

// const RescueMissionDetails:  React.FC<Props> = ({ accidentId })=> {
//   return (
//     <Paper sx={{ p: 2, marginTop: 2, backgroundColor: '#f3f3f3' }}>
//       <Typography variant="h5" gutterBottom>
//         Rescue Mission Details
//       </Typography>
//       <Typography variant="subtitle1">Commander:</Typography>
//       <Typography variant="body1" gutterBottom>
//         {missionData.commander}
//       </Typography>
//       <Typography variant="subtitle1">Responding Units:</Typography>
//       <List>
//         {missionData.units.map((unit, index) => (
//           <ListItem key={index}>
//             <ListItemAvatar>
//               <Avatar>
//                 <unit.icon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary={unit.type} />
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// };

// export default RescueMissionDetails;

import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import axios from 'axios';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WhatshotIcon from '@mui/icons-material/Whatshot'; // Corrected import
import PoliceIcon from '@mui/icons-material/LocalPolice';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

interface User {
  personalInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  role: string;
}

interface MissionData {
  commander: string;
  units: Array<{
    type: string;
    icon: React.ElementType; // Using React.ElementType for component types
  }>;
}

interface Props {
  accidentId: string;
}

const RescueMissionDetails: React.FC<Props> = ({ accidentId }) => {
  const [missionData, setMissionData] = useState<MissionData>({
    commander: '',
    units: [],
  });

  let url =
    process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  // if url is undefined, set it to REACT_APP_PROD_URL
  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  useEffect(() => {
    const fetchAccidentDetails = async () => {
      try {
        const { data } = await axios.get<{ assignedUsers: User[] }>(`${url}/accident/details/${accidentId}`);
        const updatedMissionData: MissionData = {
          commander: data.assignedUsers[0]?.personalInfo.firstName + ' ' + data.assignedUsers[0]?.personalInfo.lastName, // Assuming the first user is the commander
          units: data.assignedUsers.map((user) => ({
            type: user.role,
            icon: user.role === 'Firefighter' ? WhatshotIcon : user.role === 'Police' ? PoliceIcon : LocalHospitalIcon,
          })),
        };
        setMissionData(updatedMissionData);
      } catch (error) {
        console.error('Error fetching accident details:', error);
      }
    };

    fetchAccidentDetails();
  }, [accidentId]);

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

