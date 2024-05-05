// src/components/RealTimeIncidentMap.tsx
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L, { Icon, IconOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import AccidentDetailsPanel from "./AccidentDetailsPanel";
import HealthMonitoring from "./HealthMonitoring";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import VehicleStateDashboard from "./VehicleStateDashboard";
import "leaflet-routing-machine"; // Ensure this is imported to use routing features
import { Typography, Button } from "@mui/material";
import { LatLngTuple } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";
import { Map } from "leaflet";
import HeartRateChart from "../HeartRateChart/HeartRateChart";
import HeartRateChart2 from "../HeartRateChart/HeartRateChart2";
import Cookie from "js-cookie";
import axios from "axios";

const MapComponent = () => {
  const map = useMap(); // This hook provides the map instance

  // Example function to fly to a specific location
  const flyToLocation = (latLng: any) => {
    map.flyTo(latLng, 14); // Assuming you want to zoom to level 14
  };

  return null; // No need to return JSX if this component only handles map interactions
};

const DefaultIcon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 40],
  iconAnchor: [12, 40],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const rescueCenter = {
  id: "rc1",
  coordinates: [48.181567, 17.13506], // Hypothetical coordinates of a rescue center
  description: "Local Rescue Center",
};

// Type definitions for your data
interface Incident {
  id: number;
  coordinates: LatLngTuple; // [latitude, longitude]
  type: string; // Type of violation
  description: string;
}

const incidents: Incident[] = [
  {
    id: 1,
    coordinates: [48.181567, 17.135063] as LatLngTuple,
    type: "type1",
    description: "Description of incident 1",
  },
  {
    id: 2,
    coordinates: [48.181567, 17.135064] as LatLngTuple,
    type: "type2",
    description: "Description of incident 2",
  },
  // Add more incidents here
];

const RealTimeIncidentMap = () => {
  const routePoints = [
    L.latLng(incidents[0].coordinates[0], incidents[0].coordinates[1]),
    L.latLng(rescueCenter.coordinates[0], rescueCenter.coordinates[1]),
  ];

  const mapRef = useRef<Map | null>(null);

  const navigateToIncident = (coordinates: LatLngExpression) => {
    const map = mapRef.current;
    if (map != null) {
      map.flyTo(coordinates, 16); // Focus the map on the incident
    }
  };

  const userId = Cookie.get("userId");
  const [accidentData, setAccidentData] = useState(null);
  const [notEmptyData, setNotEmptyData] = useState(false);

  let url =
    process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }

  useEffect(() => {
    console.log(userId + "userId");
    if (userId) {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get(`${url}/accident/user/${userId}`);
          setAccidentData(data);
          if (data && Object.keys(data).length > 0) {
            // Assuming data should be an object with properties
            setNotEmptyData(true);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [userId, url]);

  // useEffect(() => {
  //   console.log(accidentData, "updated accident data");
  // }, [accidentData]);

  return (
    <>
      <MapContainer center={[48.181567, 17.135066]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {incidents.map((incident) => (
          <Marker key={incident.id} position={incident.coordinates}>
            <Popup>
              <strong>{incident.type}</strong>
              <br />
              {incident.description}
              <br />
              <Button color="primary" onClick={() => console.log("Navigate to details")}>
                Navigate to Incident
              </Button>
            </Popup>
          </Marker>
        ))}
        {incidents.map((incident) => (
          <Marker key={incident.id} position={incident.coordinates as LatLngTuple}>
            <Popup>
              <strong>{incident.type}</strong>
              <br />
              {incident.description}
              <br />
              <button onClick={() => navigateToIncident(incident.coordinates)}>Navigate to Incident</button>
            </Popup>
          </Marker>
        ))}
        <Polyline positions={routePoints} color="blue" />
        <MapComponent />
      </MapContainer>
      {notEmptyData ? (
        <>
          {accidentData && <AccidentDetailsPanel accident={accidentData} />}{" "}
          {/* <VehicleStateDashboard /> */}
          <Typography variant="h5" component="div">
            Health Monitoring of 1.passenger
            <HeartRateChart />
          </Typography>
          <Typography variant="h5" component="div">
            Health Monitoring of 2.passenger
            <HeartRateChart2 />
          </Typography>
         
        </>
      ) : (
        <Typography variant="h6" component="div">
          Actual no accidents
        </Typography>
      )}
    </>
  );
};

export default RealTimeIncidentMap;
