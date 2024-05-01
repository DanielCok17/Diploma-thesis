// // src/components/HealthMonitoring.tsx
// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface HeartRateData {
//   time: number;  // Unix timestamp
//   rate: number;  // Heart rate in beats per minute
// }

// interface HealthMonitoringProps {
//   heartRates: HeartRateData[];
//   bloodType: string;
//   knownConditions: string[];
// }


// const HealthMonitoring: React.FC<HealthMonitoringProps> = ({ heartRates, bloodType, knownConditions }) => {
//   const isAbnormal = (rate: number) => rate < 60 || rate > 100; // Example criteria

//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6">Health Monitoring</Typography>
//         <Typography>Blood Type: {bloodType}</Typography>
//         <Typography>Known Conditions: {knownConditions.join(', ')}</Typography>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={heartRates} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="time" tickFormatter={(unixTime) => new Date(unixTime * 1000).toLocaleTimeString()} />
//             <YAxis label={{ value: 'Heart Rate (bpm)', angle: -90, position: 'insideLeft' }} />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>
//         </ResponsiveContainer>
//         {heartRates.some(hr => isAbnormal(hr.rate)) && (
//           <Typography color="error">Alert: Abnormal heart rate detected!</Typography>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default HealthMonitoring;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HeartRateData {
  time: number;  // Unix timestamp
  rate: number;  // Heart rate in beats per minute
}

interface HealthMonitoringProps {
  initialHeartRates: HeartRateData[];
  bloodType: string;
  knownConditions: string[];
}

const HealthMonitoring: React.FC<HealthMonitoringProps> = ({ initialHeartRates, bloodType, knownConditions }) => {
  const [heartRates, setHeartRates] = useState<HeartRateData[]>(initialHeartRates);

  // Example criteria for abnormal heart rate
  const isAbnormal = (rate: number) => rate < 60 || rate > 100;

  // Simulate receiving new heart rate data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeartRate = {
        time: Math.floor(Date.now() / 1000),
        rate: Math.floor(Math.random() * 50) + 60  // Random heart rate between 60 and 110 bpm
      };
      setHeartRates(currentRates => [...currentRates, newHeartRate]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Health Monitoring</Typography>
        <Typography>Blood Type: {bloodType}</Typography>
        <Typography>Known Conditions: {knownConditions.join(', ')}</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={heartRates} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={(unixTime) => new Date(unixTime * 1000).toLocaleTimeString()} />
            <YAxis label={{ value: 'Heart Rate (bpm)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        {heartRates.some(hr => isAbnormal(hr.rate)) && (
          <Typography color="error">Alert: Abnormal heart rate detected!</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthMonitoring;
