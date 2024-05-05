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

//   let url: string = 'wss://diploma-thesis-backend.onrender.com'
//   // if (process.env.REACT_APP_ENVIRONMENT === "prod") {
//   //   url = process.env.REACT_APP_PROD_URL_WS || 'wss://diploma-thesis-backend.onrender.com';
//   // } else {
//   //   url = process.env.REACT_APP_DEV_URL_WS || 'wss://diploma-thesis-backend.onrender.com';
//   // }

//   useEffect(() => {
//     const ws = new WebSocket(url + '/accident-stream');

//     ws.onopen = () => {
//       console.log('Connected to WebSocket server');
//     };

//     ws.onmessage = (event) => {
//       console.log('Received message:', event.data);
//       const data = JSON.parse(event.data);

//       if (data.heartRate) { // Check for 'heartRate' property
//         const newTime = new Date().toLocaleTimeString();
//         const newHeartRate = data.heartRate;

//         setData(prevData => ({
//           labels: [...prevData.labels, newTime],
//           datasets: prevData.datasets.map(dataset => ({
//             ...dataset,
//             data: [...dataset.data, newHeartRate],
//           })),
//         }));
//       } else {
//         console.warn('Received message without heartRate property:', data);
//       }
//     };

//     // Handle WebSocket errors and closing
//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//       // Implement error handling or reconnection logic here (optional)
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//       // Implement reconnection logic here (optional)
//     };

//     return () => ws.close(); // Ensure WebSocket connection is closed on cleanup
//   }, []);

//   return (
//     <div style={{ width: '30%', height: '250px' }}>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default HeartRateChart;

import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

type Dataset = {
  label: string;
  data: number[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
};

type ChartData = {
  labels: string[];
  datasets: Dataset[];
};

const initialData: ChartData = {
  labels: [],
  datasets: [
    {
      label: "Heart Rate (bpm)",
      data: [],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
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

const HeartRateChart2: React.FC = () => {
  //   let url =
  //     process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL_WS : process.env.REACT_APP_DEV_URL_WS;

  //   if (!url) {
  //     url = process.env.REACT_APP_PROD_URL_WS;

  let url: string | null =
    process.env.REACT_APP_ENVIRONMENT === "prod"
      ? process.env.REACT_APP_PROD_URL_WS ?? null
      : process.env.REACT_APP_DEV_URL_WS ?? null;

  // Ensuring url is not undefined at runtime
  if (!url) {
    url = "wss://diploma-thesis-backend.onrender.com"; // Fallback URL if none is defined
  }

  console.log("WebSocket URL:", url);

  const [messages, setMessages] = useState<string[]>([]);
  const [chartData, setChartData] = useState<ChartData>(initialData);
  const { sendJsonMessage, lastMessage } = useWebSocket(url, {
    onOpen: () => console.log("Connected to WebSocket server"),
    onClose: () => console.log("Disconnected from WebSocket server"),
    onError: (event: Event) => console.error("WebSocket error:", event),
    shouldReconnect: (closeEvent: CloseEvent) => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      processMessage(lastMessage.data);
    }
  }, [lastMessage]);

  const processMessage = (data: any): void => {
    try {
      // Assuming data is JSON string; parse it
      const parsedData = JSON.parse(data);
      // Convert the JSON object to a string representation or handle it according to your needs
      const messageString = JSON.stringify(parsedData, null, 2); // Beautify the JSON string
      setMessages((prevMessages) => [...prevMessages, messageString]);
    } catch (error) {
      console.error("Failed to parse message data:", error);
      // Handle non-JSON data or errors
      setMessages((prevMessages) => [...prevMessages, "Received non-JSON data"]);
    }
  };

  const handleMessageSend = () => {
    const message = prompt("Enter message:");
    if (message) {
      sendJsonMessage({ message });
    }
  };

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);
        console.log("Received message:", data.passengers[1].heart_rate);
        let hartRate = data.passengers[0].heart_rate;

        if (data.passengers[1].heart_rate) {
          // assuming your JSON data has a heartRate field
          const newTime = new Date().toLocaleTimeString();
          setChartData((prevData) => ({
            labels: [...prevData.labels, newTime],
            datasets: prevData.datasets.map((dataset) => ({
              ...dataset,
              data: [...dataset.data, hartRate],
            })),
          }));
          // log chart data for debugging
          console.log(chartData);
        } else {
          console.warn("Received message without heart rate data");
        }
      } catch (error) {
        console.error("Failed to parse message data:", error);
      }
    }
  }, [lastMessage]);

  return (
    <div style={{ width: '50%', height: '350px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HeartRateChart2;

// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import useWebSocket from 'react-use-websocket';

// type Dataset = {
//     label: string;
//     data: number[];
//     fill: boolean;
//     backgroundColor: string;
//     borderColor: string;
// };

// type ChartData = {
//     labels: string[];
//     datasets: Dataset[];
// };

// const initialData: ChartData = {
//     labels: [],
//     datasets: [
//         {
//             label: 'Heart Rate (bpm)',
//             data: [],
//             fill: false,
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgba(255, 99, 132, 0.2)',
//         },
//     ],
// };

// const options = {
//     responsive: true,
//     scales: {
//         y: {
//             beginAtZero: true,
//         },
//     },
//     maintainAspectRatio: false,
// };

// const HeartRateChart: React.FC = () => {
//     const [chartData, setChartData] = useState<ChartData>(initialData);
//     const { lastMessage } = useWebSocket('ws://localhost:8000');

//     useEffect(() => {
//         if (lastMessage !== null) {
//             try {
//                 const data = JSON.parse(lastMessage.data);
//                 const newTime = new Date().toLocaleTimeString();
//                 if (data.passengers) {
//                     data.passengers.forEach((passenger: { heart_rate: number }) => {
//                         setChartData(prevData => {
//                             const newChartData = { ...prevData };
//                             newChartData.labels.push(newTime);
//                             newChartData.datasets.forEach(dataset => {
//                                 dataset.data.push(passenger.heart_rate);
//                             });
//                             return newChartData;
//                         });
//                     });
//                 }
//             } catch (error) {
//                 console.error('Failed to parse message data:', error);
//             }
//         }
//     }, [lastMessage]);

//     return (
//         <div style={{ width: '100%', height: '400px' }}>
//             <Line data={chartData} options={options} />
//         </div>
//     );
// };

// export default HeartRateChart;
