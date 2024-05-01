import React from "react";
import { Card, CardContent, Typography, Divider, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    margin: "1rem",
  },
  content: {
    marginTop: "1rem",
  },
  button: {
    margin: "0.5rem",
  },
});

// Test data for incidents
const incidentsData = [
  {
    type: "Mild",
    emergencyUnits: 2,
    time: "14:35",
    carLicense: "ABC123",
    passengers: 3,
    leader: "John Doe",
    gpsCoordinates: "48.8566, 2.3522"
  },
  {
    type: "Serious",
    emergencyUnits: 5,
    time: "09:20",
    carLicense: "XYZ789",
    passengers: 1,
    leader: "Jane Smith",
    gpsCoordinates: "40.7128, -74.0060"
  },
  {
    type: "Fatal",
    emergencyUnits: 8,
    time: "22:45",
    carLicense: "DEF456",
    passengers: 4,
    leader: "Alice Johnson",
    gpsCoordinates: "34.0522, -118.2437"
  }
];

export const ReportingAnalytics: React.FC = () => {
  const classes = useStyles();

  const handleGenerateReport = async () => {
    try {
      const reportData = JSON.stringify(incidentsData, null, 2);
      const blob = new Blob([reportData], { type: 'application/json' });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'incidentReport.json';
      link.click();
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating report: ', error);
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Reporting and Analysis
          </Typography>
          <Divider />
          <Typography variant="h6" className={classes.content}>
            Incident Reports
          </Typography>
          <div className={classes.content}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Emergency Units</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Car License</TableCell>
                  <TableCell>Passengers</TableCell>
                  <TableCell>Leader</TableCell>
                  <TableCell>GPS Coordinates</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incidentsData.map((incident, index) => (
                  <TableRow key={index}>
                    <TableCell>{incident.type}</TableCell>
                    <TableCell>{incident.emergencyUnits}</TableCell>
                    <TableCell>{incident.time}</TableCell>
                    <TableCell>{incident.carLicense}</TableCell>
                    <TableCell>{incident.passengers}</TableCell>
                    <TableCell>{incident.leader}</TableCell>
                    <TableCell>{incident.gpsCoordinates}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="contained" color="primary" onClick={handleGenerateReport} className={classes.button}>
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ReportingAnalytics;
