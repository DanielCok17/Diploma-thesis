const testData = {
    heartRates: [
      { time: 1625230800, rate: 72 },
      { time: 1625230860, rate: 75 },
      { time: 1625230920, rate: 58 }, // Simulate abnormal low heart rate
      { time: 1625230980, rate: 85 },
      { time: 1625231040, rate: 102 }, // Simulate abnormal high heart rate
    ],
    bloodType: "A+",
    knownConditions: ["Hypertension", "Diabetes"]
  };
  
  // In your App component or another part of your application:
export default testData;  