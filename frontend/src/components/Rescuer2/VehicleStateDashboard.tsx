// src/components/VehicleStateDashboard.tsx
import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SpeedIcon from '@mui/icons-material/Speed';
import PauseIcon from '@mui/icons-material/Pause';

interface VehicleState {
    steering_wheel_angle: number; // Angle in degrees
    brake_pedal: boolean; // True if pressed
    acceleration_pedal: number; // Percentage from 0 to 100
}

const vehicleState: VehicleState = {
    steering_wheel_angle: 30, // Steering 30 degrees to the right
    brake_pedal: true, // Brake pedal is pressed
    acceleration_pedal: 50, // Acceleration pedal is halfway pressed (50%)
};


const VehicleStateDashboard = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">Vehicle State Overview</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <Box textAlign="center">
                            <DirectionsCarIcon style={{ transform: `rotate(${vehicleState.steering_wheel_angle}deg)` }} fontSize="large" />
                            <Typography>Steering: {vehicleState.steering_wheel_angle}°</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box textAlign="center" color={vehicleState.brake_pedal ? "error.main" : "text.secondary"}>
                            <PauseIcon fontSize="large" />
                            <Typography>Brake Pedal: {vehicleState.brake_pedal ? "Pressed" : "Released"}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box textAlign="center">
                            <SpeedIcon fontSize="large" />
                            <Typography>Acceleration: {vehicleState.acceleration_pedal}%</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default VehicleStateDashboard;
