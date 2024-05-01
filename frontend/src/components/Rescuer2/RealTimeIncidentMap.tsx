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
import { useRef } from "react";
import { LatLngExpression } from 'leaflet';
import { Map } from 'leaflet';

const MapComponent = () => {
  const map = useMap();  // This hook provides the map instance

  // Example function to fly to a specific location
  const flyToLocation = (latLng: any) => {
    map.flyTo(latLng, 14); // Assuming you want to zoom to level 14
  };

  // You can call `flyToLocation` from event handlers or useEffect based on your app's logic

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

interface Props {
  incidents: Incident[];
}

interface ViolationIcons {
  [key: string]: Icon<IconOptions>;
}

// Custom icons for different types of incidents
const violationIcons: ViolationIcons = {
  type1: L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 25],
  }),
  type2: L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 25],
  }),
  // Add more as needed
};

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

const accident: Incident = incidents[0];

const testData = {
  initialHeartRates: [
    { time: Math.floor(Date.now() / 1000) - 300, rate: 70 },
    { time: Math.floor(Date.now() / 1000) - 240, rate: 72 },
    { time: Math.floor(Date.now() / 1000) - 180, rate: 75 },
  ],
  bloodType: "O+",
  knownConditions: ["No known conditions"],
};


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

  return (
    <>
      {/* <MapContainer center={[48.181567, 17.135066]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={incident.coordinates}
            icon={violationIcons[incident.type] || violationIcons.type1} // Default to type1 if undefined
          >
            <Popup>
              <strong>{incident.type}</strong>
              <br />
              {incident.description}
              <br />
              <button onClick={() => console.log("Navigate to details")}>View Details</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer> */}
<MapContainer
  center={[48.181567, 17.135066]}
  zoom={13}
  style={{ height: "500px", width: "100%" }}
     >

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
  <Marker
    key={incident.id}
    position={incident.coordinates as LatLngTuple}
  >
    <Popup>
      <strong>{incident.type}</strong><br />
      {incident.description}<br />
      <button onClick={() => navigateToIncident(incident.coordinates)}>Navigate to Incident</button>
    </Popup>
  </Marker>
))}
        <Polyline positions={routePoints} color="blue" />
        <MapComponent />
      </MapContainer>
      <AccidentDetailsPanel />
      <Typography variant="h5" component="div">
        Health Monitoring of 1.passenger
        <HealthMonitoring {...testData} />
      </Typography>
      <Typography variant="h5" component="div">
        Health Monitoring of 1.passenger
        <HealthMonitoring {...testData} />
      </Typography>

      <VehicleStateDashboard />
    </>
  );
};

export default RealTimeIncidentMap;
