import React from 'react';
import { Button, List, ListItem, ListItemIcon, ListItemText, Divider, Paper, Typography, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const CommunicationPanel: React.FC = () => {
    // Placeholder functions for the onClick events
    const handleCallCommandCenter = () => {
        console.log('Calling Command Center...');
    };

    const handleCallHospital = () => {
        console.log('Calling Hospital...');
    };

    const handleCallPolice = () => {
        console.log('Calling Police...');
    };

    const handleCallFireStation = () => {
        console.log('Calling Fire Station...');
    };

    const handleMessage = () => {
        console.log('Opening messaging system...');
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Paper elevation={3}>
                <Typography variant="h6" component="div" sx={{ p: 2 }}>
                    Communication Panel
                </Typography>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button onClick={handleCallCommandCenter}>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Command Center" />
                    </ListItem>
                    <ListItem button onClick={handleCallHospital}>
                        <ListItemIcon>
                            <LocalHospitalIcon />
                        </ListItemIcon>
                        <ListItemText primary="Hospital" />
                    </ListItem>
                    <ListItem button onClick={handleCallPolice}>
                        <ListItemIcon>
                        {/* <FontAwesomeIcon icon="fa-solid fa-user-police" />   
                        */}
                                             </ListItemIcon> 
                        <ListItemText primary="Police" />
                    </ListItem>
                    <ListItem button onClick={handleCallFireStation}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Fire Station" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={handleMessage}>
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Messaging System" />
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
};

export default CommunicationPanel;
