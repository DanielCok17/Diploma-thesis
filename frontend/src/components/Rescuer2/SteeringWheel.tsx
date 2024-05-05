import React, { useEffect, useState } from "react";
import "./SteeringWheel.css"; // Import the CSS file

interface VehicleState {
  vin: string;
  states: {
    steering_wheel_angle: number;
    brake_pedal: boolean;
    acceleration_pedal: number;
  }[];
}

interface SteeringWheelProps {
  data?: VehicleState; // Optional data prop
  children?: React.ReactNode; // Allow for children
}

const SteeringWheel = ({ data, children }: SteeringWheelProps) => {
  const [rotation, setRotation] = useState(0); // State for wheel rotation

//   const steeringWheelAngles = data && data.states.map((state) => state.steering_wheel_angle);

//   useEffect(() => {
//     const updateRotation = async () => { // Make updateRotation async
//       if (data && steeringWheelAngles) { // Check for both data and steeringWheelAngles
//         for (let i = 0; i < steeringWheelAngles.length; i++) {
//           const targetRotation = steeringWheelAngles[i]; // Get current angle from array
  
//           // ... (Optional animation logic - see previous explanation)
//             console.log("Updating rotation to", targetRotation);
//           setRotation(targetRotation); // Update rotation with current angle
  
//           // Wait for potential animation or a short delay (adjust as needed)
//           await new Promise(resolve => setTimeout(resolve, 2000)); // 1 second delay
//         }
//       }
//     };
  
//     updateRotation(); // Initial update
//     const intervalId = setInterval(updateRotation, 2000); // Update every second
  
//     return () => clearInterval(intervalId);
//   }, [data, steeringWheelAngles]);

    // function for random number between -180 and 180 for rotation
    const randomRotation = () => {
      return Math.floor(Math.random() * 360) - 180;
    };

    useEffect(() => {
      const interval = setInterval(() => {
        setRotation(randomRotation());
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }, []);

  return (
    <div id="wheel" style={{ transform: `rotate(${rotation}deg)`, marginTop: '20px' }}>  <div id="wheel_b">
    <div id="wheel_c">
      <div id="wheel_d"></div>
      <div id="beep"></div>
    </div>
  </div>
</div>
  );
};

export default SteeringWheel;
