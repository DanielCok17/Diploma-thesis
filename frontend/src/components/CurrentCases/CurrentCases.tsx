import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

interface Case {
  id: number;
  type: string;
  status: string;
  receivedTime: string;
}

interface CurrentCasesProps {
  cases: Case[];
}

export const CurrentCases = () => {

    const cases = [
        {
          id: 1,
          type: 'Fire in Downtown',
          status: 'In Progress',
          receivedTime: '09:00 AM'
        },
        {
          id: 2,
          type: 'Car Accident on I-95',
          status: 'In Progress',
          receivedTime: '10:00 AM'
        },
        {
          id: 3,
          type: 'Robbery at 5th St',
          status: 'In Progress',
          receivedTime: '11:00 AM'
        }
        ];
        
  return (
    <Paper elevation={3} style={{ margin: '16px', padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Current Assignments
      </Typography>
      <List>
        {cases.map((caseItem, index) => (
          <React.Fragment key={caseItem.id}>
            <ListItem>
              <ListItemText
                primary={caseItem.type}
                secondary={`Status: ${caseItem.status} - Received at ${caseItem.receivedTime}`}
              />
            </ListItem>
            {index < cases.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default CurrentCases;
