import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography, Button, List, ListItem, ListItemText, Divider, Chip } from "@mui/material";
import LiveMap from "../LiveMap/LiveMap";
import AccidentList from "../AccidentList/AccidentList";
import AccidentBusyList from "../AccidentList/AccidentBusyList";
import axios from "axios";

import RescueUnitsStatus from "../RescueUnitsStatus/RescueUnitsStatus";

const RescuerDashboard: React.FC = () => {
  const dummyAccidents = [
    // Dummy data, replace with actual data retrieved from backend
    {
      _id: "1",
      timestamp: new Date(),
      vin: "1HGCM82633A004352",
      last_timestamp_check: new Date(),
      acceleration: 5,
      speed: 120,
      license_plates: ["XYZ 1234"],
      coordinates: [34.0522, -118.2437],
      violations: [],
      driver: {
        seatbelt: true,
        drowsiness: false,
        heart_rate: [72, 76, 75],
      },
      passengers_num: 3,
    },
    {
      _id: "2",
      timestamp: new Date(),
      vin: "1HGCM82633A004352",
      last_timestamp_check: new Date(),
      acceleration: 5,
      speed: 120,
      license_plates: ["XYZ 1234"],
      coordinates: [34.0522, -118.2437],
      violations: [],
      driver: {
        seatbelt: true,
        drowsiness: false,
        heart_rate: [72, 76, 75],
      },
      passengers_num: 3,
    },
  ];

  let url =
    process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  // Function to fetch accidents (can also be used to simulate new accidents)
  const fetchAccidents = async () => {
    try {
      const response = await axios.get(`${url}/accident/testAccident/test`);
      console.log("Accidents fetched", response.data);
      // Update state with new accident data
      // setAccidents([...accidents, response.data.newAccident]);
    } catch (error) {
      console.error("Failed to fetch accidents:", error);
    }
  };

  // Event handler to simulate new accident
  const simulateNewAccident = () => {
    console.log("Simulating a new accident");
    fetchAccidents();
    // reload the page to see the new accident
    window.location.reload();
  };

  return (
    <>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Button variant="contained" color="primary" sx={{ m: 2 }} onClick={() => simulateNewAccident()}>
          Simulate New Accident
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on medium and up
            flex: "1 1 auto",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "70%" }, // Full width on small screens, 70% on medium and up
              p: { xs: 1, sm: 2, md: 4 }, // Adjust padding based on screen size
            }}
          >
            <LiveMap />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "30%" }, // Full width on small screens, 30% on medium and up
              p: { xs: 1, sm: 2, md: 2 }, // Adjust padding based on screen size
              overflowY: "auto",
              maxHeight: { xs: "300px", sm: "400px", md: "none" }, // Set a max height for mobile and tablet, none for desktop
            }}
          >
            <AccidentList accidents={dummyAccidents} />
            <AccidentBusyList accidents={dummyAccidents} />
          </Box>
        </Box>

        {/* Separate row for Rescue Units Status, positioned at the bottom */}
        <Box sx={{ p: 2 }}>
          <RescueUnitsStatus />
        </Box>
      </Box>
    </>
  );
};

export default RescuerDashboard;
