// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';

// // Define a type for the dataset to ensure correct typing
// type Dataset = {
//   label: string;
//   data: number[];
//   fill: boolean;
//   backgroundColor: string;
//   borderColor: string;
// };

// // Use this type to define the state shape
// type ChartData = {
//   labels: string[];
//   datasets: Dataset[];
// };

// // Initial static dataset with the type assigned
// const initialData: ChartData = {
//   labels: [],
//   datasets: [
//     {
//       label: 'Heart Rate (bpm)',
//       data: [],
//       fill: false,
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgba(255, 99, 132, 0.2)',
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   scales: {
//     y: {
//       beginAtZero: true,
//     },
//   },
//   maintainAspectRatio: false,
// };

// const HeartRateChart = () => {
//   // Specify the ChartData type for the state
//   const [data, setData] = useState<ChartData>(initialData);

//   // Simulate real-time data updates
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTime = new Date().toLocaleTimeString();
//       const newHeartRate = Math.floor(Math.random() * 40) + 60;

//       setData(prevData => ({
//         labels: [...prevData.labels, newTime],
//         datasets: prevData.datasets.map(dataset => ({
//           ...dataset,
//           data: [...dataset.data, newHeartRate],
//         })),
//       }));
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ width: '30%', height: '250px' }}>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default HeartRateChart;

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// Define a type for the dataset to ensure correct typing
type Dataset = {
  label: string;
  data: number[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
};

// Use this type to define the state shape
type ChartData = {
  labels: string[];
  datasets: Dataset[];
};

// Initial static dataset with the type assigned
const initialData: ChartData = {
  labels: [],
  datasets: [
    {
      label: 'Heart Rate (bpm)',
      data: [],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

const HeartRateChart = () => {
  // Specify the ChartData type for the state
  const [data, setData] = useState<ChartData>(initialData);

  let url: string = 'wss://diploma-thesis-backend.onrender.com'
  // if (process.env.REACT_APP_ENVIRONMENT === "prod") {
  //   url = process.env.REACT_APP_PROD_URL_WS || 'wss://diploma-thesis-backend.onrender.com';
  // } else {
  //   url = process.env.REACT_APP_DEV_URL_WS || 'wss://diploma-thesis-backend.onrender.com';
  // }
  
  useEffect(() => {
    const ws = new WebSocket(url + '/accident-stream');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      const data = JSON.parse(event.data);
    
      if (data.heartRate) { // Check for 'heartRate' property
        const newTime = new Date().toLocaleTimeString();
        const newHeartRate = data.heartRate;
    
        setData(prevData => ({
          labels: [...prevData.labels, newTime],
          datasets: prevData.datasets.map(dataset => ({
            ...dataset,
            data: [...dataset.data, newHeartRate],
          })),
        }));
      } else {
        console.warn('Received message without heartRate property:', data);
      }
    };

    // Handle WebSocket errors and closing
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      // Implement error handling or reconnection logic here (optional)
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      // Implement reconnection logic here (optional)
    };

    return () => ws.close(); // Ensure WebSocket connection is closed on cleanup
  }, []);

  return (
    <div style={{ width: '30%', height: '250px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default HeartRateChart;
