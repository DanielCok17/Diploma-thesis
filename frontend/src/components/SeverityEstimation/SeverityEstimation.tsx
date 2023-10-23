import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

type SeverityInput = {
    impactForce: number;
    numberOfVehicles: number;
    collisionType: string;
};

const estimateSeverity = (input: SeverityInput): string => {
    let severityScore = input.impactForce;

    if (input.numberOfVehicles > 1) {
        severityScore *= 1.5; // Assuming more vehicles increase severity.
    }

    if (input.collisionType === 'head-on') {
        severityScore *= 2; // Assuming head-on collisions are more severe.
    }

    // Convert severityScore to a qualitative measure (this is just a basic example).
    if (severityScore > 200) {
        return 'High';
    } else if (severityScore > 100) {
        return 'Medium';
    } else {
        return 'Low';
    }
};

const SeverityEstimation: React.FC = () => {
    const [impactForce, setImpactForce] = useState<number>(0);
    const [numberOfVehicles, setNumberOfVehicles] = useState<number>(1);
    const [collisionType, setCollisionType] = useState<string>('');

    const handleSubmit = () => {
        const severity = estimateSeverity({
            impactForce: Number(impactForce),
            numberOfVehicles: Number(numberOfVehicles),
            collisionType
        });

        alert(`Estimated Severity: ${severity}`);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h5" align="center">Severity Estimation</Typography>
            <Box component="form" sx={{ mt: 3 }} onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="impactForce"
                    label="Impact Force"
                    type="number"
                    value={impactForce}
                    onChange={e => setImpactForce(Number(e.target.value))}

                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="numberOfVehicles"
                    label="Number of Vehicles"
                    type="number"
                    value={numberOfVehicles}
                    onChange={e => setNumberOfVehicles(Number(e.target.value))}
                    />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="collision-type-label">Collision Type</InputLabel>
                    <Select
                        labelId="collision-type-label"
                        id="collisionType"
                        value={collisionType}
                        label="Collision Type"
                        onChange={e => setCollisionType(e.target.value as string)}
                    >
                        <MenuItem value="head-on">Head-On</MenuItem>
                        <MenuItem value="side-impact">Side-Impact</MenuItem>
                        {/* Add more collision types as needed */}
                    </Select>
                </FormControl>
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>Estimate Severity</Button>
            </Box>
        </Container>
    );
}

export default SeverityEstimation;