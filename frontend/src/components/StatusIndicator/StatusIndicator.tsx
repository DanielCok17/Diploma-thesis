// import React from 'react';
// import { Card, CardContent, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

// interface StatusIndicatorProps {
//   status: string;
//   title: string;
//   description: string;
// }

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       margin: theme.spacing(1),
//       backgroundColor: theme.palette.background.paper,
//     },
//     details: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     content: {
//       flex: '1 0 auto',
//     },
//     indicator: {
//       height: 12,
//       width: 12,
//       borderRadius: '50%',
//       display: 'inline-block',
//       marginRight: theme.spacing(1),
//       backgroundColor: (props: StatusIndicatorProps) => {
//         switch (props.status) {
//           case 'Operational':
//             return theme.palette.success.main;
//           case 'Warning':
//             return theme.palette.warning.main;
//           case 'Critical':
//             return theme.palette.error.main;
//           default:
//             return theme.palette.grey[500];
//         }
//       },
//     },
//   }),
// );

// const StatusIndicator: React.FC<StatusIndicatorProps> = (props) => {
//   const classes = useStyles(props);
//   return (
//     <Card className={classes.root}>
//       <CardContent className={classes.content}>
//         <Typography variant="subtitle1">
//           <span className={classes.indicator} />{props.title}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           {props.description}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default StatusIndicator;

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Collapse,
  LinearProgress,
  Tooltip
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WarningIcon from '@material-ui/icons/Warning';
import WeatherIcon from '@material-ui/icons/AcUnit';
import TrafficIcon from '@material-ui/icons/Traffic';

interface StatusIndicatorProps {
  status: string;
  title: string;
  description: string;
  details: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      margin: theme.spacing(1),
      position: 'relative',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    statusHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statusIcon: {
      marginRight: theme.spacing(1),
    },
    progress: {
      height: theme.spacing(0.5),
      borderRadius: 5,
      backgroundColor: theme.palette.grey[300],
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: (props: StatusIndicatorProps) => {
          switch (props.status) {
            case 'Operational':
              return theme.palette.success.main;
            case 'Warning':
              return theme.palette.warning.main;
            case 'Critical':
              return theme.palette.error.main;
            default:
              return theme.palette.grey[500];
          }
        },
      },
    },
    indicator: {
      height: 12,
      width: 12,
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: theme.spacing(1),
    },
  }),
);

const StatusIndicator: React.FC<StatusIndicatorProps> = (props) => {
  const classes = useStyles(props);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.statusHeader}>
          <Typography variant="h6">
            {props.title === 'Zásahy' && <WarningIcon color="action" className={classes.statusIcon} />}
            {props.title === 'Počasie' && <WeatherIcon color="action" className={classes.statusIcon} />}
            {props.title === 'Doprava' && <TrafficIcon color="action" className={classes.statusIcon} />}
            {props.title}
          </Typography>
          <IconButton
            className={`${classes.expand} ${expanded ? classes.expandOpen : ''}`}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary">
          {props.description}
        </Typography>
        <Tooltip title="Detaily" placement="top" arrow>
          <LinearProgress variant="determinate" value={50} className={classes.progress} />
        </Tooltip>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.details}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default StatusIndicator;

