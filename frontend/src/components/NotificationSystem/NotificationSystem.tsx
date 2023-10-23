// import React, { useState, useEffect } from 'react';
// import { Box, Typography, List, ListItem, IconButton, Paper } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// type Notification = {
//   type: 'success' | 'warning' | 'error' | 'info';
//   message: string;
//   id: number;
//   dismissed: boolean;
// };

// const NotificationSystem: React.FC = () => {
//   const initialNotifications: Notification[] = [
//     {
//       type: 'success',
//       message: 'Task completed successfully!',
//       id: 1,
//       dismissed: false,
//     },
//     {
//       type: 'warning',
//       message: 'Low disk space. Please free up some space!',
//       id: 2,
//       dismissed: false,
//     },
//     {
//       type: 'error',
//       message: 'Failed to fetch data.',
//       id: 3,
//       dismissed: false,
//     },
//     {
//       type: 'info',
//       message: 'New update available.',
//       id: 4,
//       dismissed: false,
//     },
//   ];

//   const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setNotifications((prevNotifications) => {
//         return prevNotifications.filter((notification) => !notification.dismissed);
//       });
//     }, 5000);

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [notifications]);

//   const handleDismissNotification = (id: number) => {
//     setNotifications((prevNotifications) => {
//       return prevNotifications.map((notification) =>
//         notification.id === id ? { ...notification, dismissed: true } : notification
//       );
//     });
//   };

//   const determineNotificationColor = (type: Notification['type']) => {
//     switch (type) {
//       case 'success':
//         return '#4caf50'; // Green
//       case 'warning':
//         return '#ff9800'; // Orange
//       case 'error':
//         return '#f44336'; // Red
//       case 'info':
//         return '#2196f3'; // Blue
//       default:
//         return '#fff';
//     }
//   };

//   return (
//     <Paper elevation={6} sx={{ position: 'fixed', bottom: 24, right: 24, maxWidth: '300px', width: '100%' }}>
//       <Box p={2}>
//         <Typography variant="h6">Notifications</Typography>
//         <List>
//           {notifications.map((notification) => (
//             <ListItem
//               key={notification.id}
//               sx={{
//                 backgroundColor: determineNotificationColor(notification.type),
//                 margin: '8px 0',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 color: '#fff',
//                 position: 'relative'
//               }}
//             >
//               <Typography variant="subtitle2">{notification.message}</Typography>
//               <IconButton
//                 size="small"
//                 color="inherit"
//                 onClick={() => handleDismissNotification(notification.id)}
//                 sx={{ position: 'absolute', top: 8, right: 8 }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Paper>
//   );
// };

// export default NotificationSystem;

import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, IconButton, Badge, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";

type Notification = {
  type: "success" | "warning" | "error" | "info";
  message: string;
  id: number;
  dismissed: boolean;
};

const NotificationSystem: React.FC = () => {
  const initialNotifications: Notification[] = [
    {
      type: "success",
      message: "Task completed successfully!",
      id: 1,
      dismissed: false,
    },
    {
      type: "warning",
      message: "Low disk space. Please free up some space!",
      id: 2,
      dismissed: false,
    },
    {
      type: "error",
      message: "Failed to fetch data.",
      id: 3,
      dismissed: false,
    },
    {
      type: "info",
      message: "New update available.",
      id: 4,
      dismissed: false,
    },
  ];

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isMinimalist, setIsMinimalist] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotifications((prevNotifications) => {
        return prevNotifications.filter((notification) => !notification.dismissed);
      });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notifications]);

  const handleDismissNotification = (id: number) => {
    setNotifications((prevNotifications) => {
      return prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, dismissed: true } : notification
      );
    });
  };

  const determineNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "#4caf50"; // Green
      case "warning":
        return "#ff9800"; // Orange
      case "error":
        return "#f44336"; // Red
      case "info":
        return "#2196f3"; // Blue
      default:
        return "#fff";
    }
  };

  const handleMinimalistToggle = () => {
    setIsMinimalist(!isMinimalist);
  };

  return isVisible ? (
    <Paper elevation={6} sx={{ position: "fixed", bottom: 24, right: 24, maxWidth: "300px", width: "100%" }}>
      {isMinimalist ? (
        <Box p={2} onClick={handleMinimalistToggle}>
          <Badge badgeContent={notifications.length} color="primary">
            <NotificationsIcon />
          </Badge>
        </Box>
      ) : (
        <Box p={2}>
          <Typography variant="h6">Notifications</Typography>
          <List>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  backgroundColor: determineNotificationColor(notification.type),
                  margin: "8px 0",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  color: "#fff",
                  position: "relative",
                }}
              >
                <Typography variant="subtitle2">{notification.message}</Typography>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => handleDismissNotification(notification.id)}
                  sx={{ position: "absolute", top: 8, right: 16 }}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={handleMinimalistToggle}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <NotificationsIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  ) : null;
};

export default NotificationSystem;
