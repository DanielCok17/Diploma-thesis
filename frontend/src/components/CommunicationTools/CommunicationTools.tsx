import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import EmailIcon from '@material-ui/icons/Email';
import ChatIcon from '@material-ui/icons/Chat';

interface Team {
  name: string;
  email: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    textField: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const CommunicationTools: React.FC = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');

  const teams: Team[] = [
    { name: 'Medical Unit', email: 'medical@rescue.org' },
    { name: 'Firefighters', email: 'firefighters@rescue.org' },
    // More teams...
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const sendMessage = (team: Team) => {
    console.log(`Send message to ${team.name}: ${inputValue}`);
    // Here you would send the message to the team's communication channel
    // Reset input field
    setInputValue('');
  };

  const sendEmail = (team: Team) => {
    // Here you would integrate with your email service to send an email
    const mailtoLink = `mailto:${team.email}?subject=Urgent&body=${encodeURIComponent(inputValue)}`;
    window.location.href = mailtoLink;
    // Reset input field
    setInputValue('');
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h2">
        Communication with Teams
      </Typography>
      <TextField
        label="Your message"
        multiline
        rows={4}
        variant="outlined"
        className={classes.textField}
        value={inputValue}
        onChange={handleInputChange}
      />
      <List>
        {teams.map((team) => (
          <React.Fragment key={team.name}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <ChatIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={team.name} secondary={team.email} />
              <IconButton edge="end" onClick={() => sendMessage(team)}>
                <SendIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => sendEmail(team)}>
                <EmailIcon />
              </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {/* Optionally, a button to send a message to all teams could be included */}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<SendIcon />}
        onClick={() => teams.forEach(sendMessage)}
      >
        Send to All
      </Button>
    </div>
  );
};

export default CommunicationTools;
