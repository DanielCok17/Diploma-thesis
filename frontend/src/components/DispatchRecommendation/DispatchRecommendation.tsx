import React, { useState, SyntheticEvent } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

type Accident = {
  id: number;
  severity: 'Low' | 'Medium' | 'High';
  collisionType: 'head-on' | 'side-impact';
};

type DispatchSuggestion = {
  ambulances: number;
  fireTrucks: number;
  policeCars: number;
};

const suggestDispatch = (accident: Accident): DispatchSuggestion => {
  switch (accident.severity) {
    case 'High':
      return {
        ambulances: 3,
        fireTrucks: 2,
        policeCars: 4
      };
    case 'Medium':
      return accident.collisionType === 'head-on'
        ? { ambulances: 2, fireTrucks: 1, policeCars: 2 }
        : { ambulances: 1, fireTrucks: 1, policeCars: 2 };
    case 'Low':
    default:
      return {
        ambulances: 1,
        fireTrucks: 0,
        policeCars: 1
      };
  }
};

const sampleAccidents: Accident[] = [
    {
      id: 1,
      severity: 'Low',
      collisionType: 'side-impact'
    },
    {
      id: 2,
      severity: 'Medium',
      collisionType: 'head-on'
    },
    {
      id: 3,
      severity: 'High',
      collisionType: 'side-impact'
    },
    {
      id: 4,
      severity: 'High',
      collisionType: 'head-on'
    },
    {
      id: 5,
      severity: 'Medium',
      collisionType: 'side-impact'
    }
  ];

const DispatchRecommendation: React.FC = () => {
  const [selectedAccident, setSelectedAccident] = useState<Accident | null>(null);

  const handleAccidentSelection = (event: SelectChangeEvent<number>) => {
    const selectedAccident = sampleAccidents[event.target.value as number - 1];
    setSelectedAccident(selectedAccident);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center">Dispatch Recommendation</Typography>
      <Box sx={{ mt: 3 }}>
        <Select
          value={selectedAccident?.id}
          onChange={handleAccidentSelection}
        >
          {sampleAccidents.map((accident) => (
            <MenuItem key={accident.id} value={accident.id}>
              Accident {accident.id}
            </MenuItem>
          ))}
        </Select>

        {selectedAccident && (
          <Box>
            <Typography variant="h6">Recommended Units:</Typography>
            <Typography>
              Ambulances: {suggestDispatch(selectedAccident).ambulances}
            </Typography>
            <Typography>
              Fire Trucks: {suggestDispatch(selectedAccident).fireTrucks}
            </Typography>
            <Typography>
              Police Cars: {suggestDispatch(selectedAccident).policeCars}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );

}

export default DispatchRecommendation;