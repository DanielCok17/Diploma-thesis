import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";

type Violation = {
  type: string;
  coordinates: number[];
  timestamp: Date;
};

type Driver = {
  seatbelt: boolean;
  drowsiness: boolean;
  heart_rate: number[];
};

type Accident = {
  timestamp: Date;
  vin: string;
  last_timestamp_check: Date;
  acceleration: number;
  speed: number;
  license_plates: string[];
  coordinates: number[];
  violations: Violation[];
  driver: Driver;
  passengers_num: number;
  status: string;
};

const AllAccidents: React.FC = () => {
  const [accidents, setAccidents] = useState<Accident[]>([]);

  let url =
    process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        const { data } = await axios.get<Accident[]>(`${url}/accident/allAccidents`); // Adjust URL to your API
        setAccidents(data);
      } catch (error) {
        console.error("Failed to fetch accidents:", error);
      }
    };

    fetchAccidents();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ margin: 2 }}>
        All Accidents
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="accidents table">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>VIN</TableCell>
              <TableCell>Speed (km/h)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accidents.map((accident, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(accident.timestamp).toLocaleString()}</TableCell>
                <TableCell>{accident.vin}</TableCell>
                <TableCell>{accident.speed}</TableCell>
                <TableCell>{accident.status}</TableCell>
                <TableCell>{accident.violations.map((violation) => violation.type).join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllAccidents;
