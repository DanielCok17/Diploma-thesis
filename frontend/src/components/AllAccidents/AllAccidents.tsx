import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemText,
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
  _id: string;
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

interface RescueUnit {
  rescueUnitsId: string;
}

interface PassengerNote {
  notes: string;
}

interface ClosedAccident {
  accidentId: string; // Changed from ObjectId to string
  userIds: string[]; // Changed from ObjectId to string
  rescueUnits: RescueUnit[];
  note: string;
  severity: "simple" | "moderate" | "critical";
  passengerNotes: PassengerNote[];
  closedAt: Date; // No change needed, Date object is fine
}

const AllAccidents: React.FC = () => {
  const [accidents, setAccidents] = useState<Accident[]>([]);
  const [expandedAccidentId, setExpandedAccidentId] = useState<string | null>(null); // Type explicitly set to string | null
  const [closedAccidents, setClosedAccidents] = useState<ClosedAccident[]>([]);

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
        console.log(data + "data");
      } catch (error) {
        console.error("Failed to fetch accidents:", error);
      }
    };

    fetchAccidents();
  }, []);

  const shodetails = (id: string) => {
    // Toggle visibility or set the expanded accident ID
    setExpandedAccidentId(expandedAccidentId === id ? null : id);

    // Fetch closed accident details only if expanding
    if (expandedAccidentId !== id) {
      axios
        .get(`${url}/closed-accident/accident/${id}`)
        .then((response) => {
          // Assuming the API returns the details directly
          setClosedAccidents((prev) => [...prev, response.data]);
        })
        .catch((error) => console.error(`Error fetching closed accident details for ID ${id}:`, error));
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ margin: 2 }}>
        All accidents list
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="accidents table">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>VIN</TableCell>
              <TableCell>Speed (km/h)</TableCell>
              <TableCell>Acceleration (m/s²)</TableCell>
              <TableCell>License Plates</TableCell>
              <TableCell>Coordinates</TableCell>
              <TableCell>Driver Seatbelt</TableCell>
              <TableCell>Driver Drowsiness</TableCell>
              <TableCell>Passengers</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Violations</TableCell>
              <TableCell>Show details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accidents.map((accident) => (
              <React.Fragment key={accident._id}>
                <TableRow key={accident._id}>
                  <TableCell>{new Date(accident.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{accident.vin}</TableCell>
                  <TableCell>{accident.speed}</TableCell>
                  <TableCell>{accident.acceleration}</TableCell>
                  <TableCell>{accident.license_plates.join(", ")}</TableCell>
                  <TableCell>{`${accident.coordinates[0]}, ${accident.coordinates[1]}`}</TableCell>
                  <TableCell>{accident.driver.seatbelt ? "Yes" : "No"}</TableCell>
                  <TableCell>{accident.driver.drowsiness ? "Yes" : "No"}</TableCell>
                  <TableCell>{accident.passengers_num}</TableCell>
                  <TableCell>{accident.status}</TableCell>
                  <TableCell>{accident.violations.map((v) => v.type).join(", ")}</TableCell>
                  <TableCell>
                    <Button onClick={() => shodetails(accident._id)} variant="contained" color="primary">
                      Show details
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedAccidentId === accident._id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          Accident Details
                        </Typography>
                        {closedAccidents
                          .filter((ca) => ca.accidentId === accident._id)
                          .map((ca) => (
                            <Box key={ca.accidentId} sx={{ marginTop: 2 }}>
                              <Typography variant="subtitle1">Notes: {ca.note}</Typography>
                              <Typography variant="subtitle1">Severity: {ca.severity}</Typography>
                              <Typography variant="subtitle1">
                                Closed At: {new Date(ca.closedAt).toLocaleString()}
                              </Typography>
                              {ca.rescueUnits.map((unit, index) => (
                                <Typography key={index} variant="subtitle2">
                                  Rescue Unit ID: {unit.rescueUnitsId}
                                </Typography>
                              ))}
                              {ca.passengerNotes.map((note, index) => (
                                <Typography key={index} variant="subtitle2">
                                  Passenger Note: {note.notes}
                                </Typography>
                              ))}
                              <Typography variant="subtitle1">User IDs:</Typography>
                            </Box>
                          ))}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllAccidents;
