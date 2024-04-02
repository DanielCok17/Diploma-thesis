import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, makeStyles, Theme } from '@material-ui/core';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

interface Notification {
  id: number;
  type: 'incident' | 'warning' | 'info';
  message: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  notificationList: {
    maxHeight: '50vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    // The general style for all list items can go here
  },
  listItemIncident: {
    backgroundColor: theme.palette.error.light,
  },
  listItemWarning: {
    backgroundColor: theme.palette.warning.light,
  },
  listItemInfo: {
    backgroundColor: theme.palette.info.light,
  },
  closeIcon: {
    marginLeft: 'auto',
  },
}));

const NotificationArea: React.FC = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'incident', message: 'Traffic accident reported on Main Street.' },
    { id: 2, type: 'warning', message: 'Severe weather alert in your area.' },
    { id: 3, type: 'info', message: 'Scheduled system maintenance tonight at 11 PM.' },
    // Add more notifications as needed
  ]);

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getListItemClassName = (type: string) => {
    switch (type) {
      case 'incident':
        return classes.listItemIncident;
      case 'warning':
        return classes.listItemWarning;
      case 'info':
        return classes.listItemInfo;
      default:
        return '';
    }
  };

  return (
    <List className={classes.notificationList}>
      {notifications.map((notification) => (
        <ListItem key={notification.id} className={`${classes.listItem} ${getListItemClassName(notification.type)}`}>
          <ListItemIcon>
            {notification.type === 'incident' && <NotificationImportantIcon color="error" />}
            {notification.type === 'warning' && <WarningIcon color="secondary" />}
            {notification.type === 'info' && <InfoIcon color="primary" />}
          </ListItemIcon>
          <ListItemText primary={notification.message} />
          <IconButton
            edge="end"
            className={classes.closeIcon}
            onClick={() => handleDismiss(notification.id)}
          >
            <CloseIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationArea;
