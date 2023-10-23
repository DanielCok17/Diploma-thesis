import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  grid: {
    marginTop: theme.spacing(3),
  },
  typography: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
}));

const VehicleSensors = () => {
  const classes = useStyles();

  const vehicleSensorData = [
    {
      name: "Accelerometer",
      value: "0.5 g",
    },
    {
      name: "Gyroscope",
      value: "10° per sec",
    },
    {
      name: "Airbag Deployment Status",
      value: "Not deployed",
    },
    {
      name: "Engine RPM",
      value: "2000 RPM",
    },
    {
      name: "Vehicle Speed",
      value: "60 MPH",
    },
  ];

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title="Vehicle Sensors"
      />
      <CardContent className={classes.cardContent}>
        <Grid container className={classes.grid}>
          {vehicleSensorData.map((sensorData) => (
            <Grid item key={sensorData.name} xs={12} sm={6}>
              <Typography className={classes.typography}>
                {sensorData.name}
              </Typography>
              <Typography>
                {sensorData.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VehicleSensors;