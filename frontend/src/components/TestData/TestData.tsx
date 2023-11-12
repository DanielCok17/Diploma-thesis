import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type Violation = {
  _id: string;
  type: string;
  coordinates: string;
  timestamp: string;
};

type Driver = {
  _id: string;
  seatbelt: boolean;
  drowsiness: boolean;
  heart_rate: number;
};

type AccidentData = {
  _id: string;
  timestamp: string;
  acceleration: number;
  speed: number;
  license_plates: string[];
  coordinates: string;
  violations: Violation[];
  driver: Driver;
  passengers_num: number;
  __v: number;
};

const DataTable = () => {
    let url =
    process.env.REACT_APP_ENVIRONMENT === "production" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
    console.log(url);

    // if url is undefined than
    if (url === undefined || url === null || url === "" ) {
        url = 'https://diploma-thesis-backend.onrender.com'
    }

    const [data, setData] = React.useState<AccidentData[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${url}/accident/accident-data`);
            const data = await response.json();
            console.log(data);
            setData(data);
        };
        fetchData();
    }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell align="right">Acceleration</TableCell>
            <TableCell align="right">Speed (km/h)</TableCell>
            <TableCell>License Plates</TableCell>
            <TableCell>Coordinates</TableCell>
            <TableCell>Violations</TableCell>
            <TableCell>Driver Info</TableCell>
            <TableCell align="right">Passengers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.timestamp}
              </TableCell>
              <TableCell align="right">{item.acceleration}</TableCell>
              <TableCell align="right">{item.speed}</TableCell>
              <TableCell>{item.license_plates.join(', ')}</TableCell>
              <TableCell>{item.coordinates}</TableCell>
              <TableCell>{item.violations.map(v => v.type).join(', ')}</TableCell>
              <TableCell>{`Seatbelt: ${item.driver.seatbelt}, Drowsiness: ${item.driver.drowsiness}, Heart Rate: ${item.driver.heart_rate}`}</TableCell>
              <TableCell align="right">{item.passengers_num}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
