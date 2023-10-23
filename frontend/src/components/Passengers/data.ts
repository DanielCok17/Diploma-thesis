type PassengerDetails = {
  [key: number]: {
      id: number;
      name: string;
      heartRate: number;
      oxygenLevel: number;
      injuryDetails: string;
  };
}

export const passengers = [
    { id: 1, name: 'John Doe', healthStatus: 'stable' },
    { id: 2, name: 'Jane Smith', healthStatus: 'critical' },
    { id: 3, name: 'Alice Johnson', healthStatus: 'unknown' },
  ];
  
  export const passengerDetails: PassengerDetails = {
    1: { id: 1, name: 'John Doe', heartRate: 75, oxygenLevel: 98, injuryDetails: 'Minor cuts and bruises' },
    2: { id: 2, name: 'Jane Smith', heartRate: 120, oxygenLevel: 85, injuryDetails: 'Severe head trauma' },
    3: { id: 3, name: 'Alice Johnson', heartRate: 88, oxygenLevel: 91, injuryDetails: 'Broken arm and leg injury' },
  };