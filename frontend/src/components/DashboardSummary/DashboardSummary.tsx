import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActionArea,
} from "@material-ui/core";
import SpeedIcon from "@material-ui/icons/Speed";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import PeopleIcon from "@material-ui/icons/People";
import UpdateIcon from "@material-ui/icons/Update";

interface KPI {
  icon: React.ReactElement;
  label: string;
  value: string | number;
  description: string; // Additional description for each KPI
  onClick: () => void; // Click handler for actionable cards
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
      },
    card: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(2),
      minHeight: 120,
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      [theme.breakpoints.up("sm")]: {
        marginRight: theme.spacing(2),
      },
    },
    content: {
      flex: "1 0 auto",
    },
    actionArea: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        alignItems: "flex-start",
      },
    },
    description: {
      color: theme.palette.text.secondary,
    },
    cardContainer: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > *": {
          margin: theme.spacing(1),
          [theme.breakpoints.up("md")]: {
            maxWidth: "calc(100% / 5 - theme.spacing(2))", // Correct the max width calculation for five items per row
          },
        },
      },
  })
);

const DashboardSummary: React.FC = () => {
  const classes = useStyles();

  // Mock KPI data
  const kpis: KPI[] = [
    {
      icon: <SpeedIcon />,
      label: "Avg. Response Time",
      value: "3 mins",
      description: "Time taken to respond to the last 10 incidents",
      onClick: () => alert("Navigating to detailed response times..."),
    },
    {
      icon: <AssignmentIcon />,
      label: "Active Incidents",
      value: 12,
      description: "Current ongoing incidents",
      onClick: () => alert("Navigating to active incidents..."),
    },
    {
      icon: <DoneAllIcon />,
      label: "Cases Closed Today",
      value: 5,
      description: "Incidents resolved today",
      onClick: () => alert("Navigating to closed cases..."),
    },
    {
      icon: <PeopleIcon />,
      label: "Team Availability",
      value: "75%",
      description: "Available rescue teams",
      onClick: () => alert("Navigating to team status..."),
    },
    {
      icon: <UpdateIcon />,
      label: "Last System Update",
      value: "2 hrs ago",
      description: "Most recent system maintenance check",
      onClick: () => alert("Navigating to system updates..."),
    },
    // Add more KPIs as needed
  ];

  return (
    <div className={classes.root}>
      <div className={classes.cardContainer}>
        <Grid container spacing={3}>
          {kpis.map((kpi, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} xl={2} key={index}>
              {" "}
              {/* Adjusted for 5 cards in a row on large screens */}
              <CardActionArea onClick={kpi.onClick} className={classes.actionArea}>
                <Avatar className={classes.avatar}>{kpi.icon}</Avatar>
                <Card className={classes.card}>
                  <CardContent className={classes.content}>
                    <Typography variant="h5">{kpi.label}</Typography>
                    <Typography variant="h6" color="primary">
                      {kpi.value}
                    </Typography>
                    <Typography className={classes.description}>{kpi.description}</Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default DashboardSummary;
