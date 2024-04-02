// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useMap, Polyline } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";
// import L, { Icon } from "leaflet";
// import StatusIndicator from "../StatusIndicator/StatusIndicator";
// import NotificationArea from "../NotificationArea/NotificationArea";
// import ResourceOverview from "../ResourceOverview/ResourceOverview";
// import IncidentLog from "../IncidentLog/IncidentLog";
// import DashboardSummary from "../DashboardSummary/DashboardSummary";

// // Fix the default icon issue with Leaflet 1.x
// const defaultIcon = new Icon({
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   tooltipAnchor: [16, -28],
//   shadowSize: [41, 41],
// });

// const MyMap = () => {
//   const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setPosition([position.coords.latitude, position.coords.longitude]);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error fetching location: ", error.message);
//         setError("Unable to retrieve your location");
//         setLoading(false);
//       }
//     );
//   }, []);

//   if (loading) {
//     return <div>Loading map...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <MapContainer center={position} zoom={13} style={{ height: "500px", width: "90%" }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={position} icon={defaultIcon}>
//             <Popup>
//               You are here! <br /> Easily customizable.
//             </Popup>
//           </Marker>
//         </MapContainer>
//         <div style={{ width: "50%", padding: "1rem" }}>
//           <StatusIndicator
//             status="Operational"
//             title="Zásahy"
//             description="Všetky jednotky sú operatívne."
//             details="Detailné informácie o aktuálnej operatívnosti jednotiek."
//           />
//           <StatusIndicator
//             status="Warning"
//             title="Počasie"
//             description="Očakávané silné búrky."
//             details="Detailné informácie o očakávanom počasí."
//           />
//           <StatusIndicator
//             status="Critical"
//             title="Doprava"
//             description="Dopravná nehoda na hlavnej ceste."
//             details="Detailné informácie o dopravnej situácii."
//           />
//         </div>
//         <NotificationArea />
//       </div>
//       <div style={{ display: "flex", gap: "1rem" }}>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <ResourceOverview />
//         </div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <IncidentLog />
//         </div>
//       </div>
//       <DashboardSummary />
//     </>
//   );
// };

// export default MyMap;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon, LatLngTuple, LatLngExpression } from 'leaflet';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import NotificationArea from '../NotificationArea/NotificationArea';
import ResourceOverview from '../ResourceOverview/ResourceOverview';
import IncidentLog from '../IncidentLog/IncidentLog';
import DashboardSummary from '../DashboardSummary/DashboardSummary';
import CommunicationTools from '../CommunicationTools/CommunicationTools';

const defaultIcon = new Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const simulatedDataStream: LatLngTuple[] = [
  [48.18152111281692, 17.135004959310443], // Your current position
  [48.182, 17.135], // Slightly north-east
  [48.183, 17.136], // Further north-east
  [48.184, 17.137], // Even further north-east, simulating movement
  [48.185, 17.138],
  [48.186, 17.139],
  [48.187, 17.140],
  [48.188, 17.141],
  [48.189, 17.142],
  [48.190, 17.143],
  [48.191, 17.1 ],
];

const calculateDistance = (latLng1: LatLngTuple, latLng2: LatLngTuple) => {
  return L.latLng(latLng1).distanceTo(latLng2);
};


const MovingMarker: React.FC = () => {
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple>(simulatedDataStream[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const map = useMap();

  useEffect(() => {
    const moveMarker = () => {
      let nextIndex = currentIndex + 1;
      
      // If we're at the last point, stop moving.
      if (nextIndex >= simulatedDataStream.length) {
        return;
      }

      // Calculate the distance to the next point.
      const nextPosition = simulatedDataStream[nextIndex];
      const distance = calculateDistance(markerPosition, nextPosition);

      // Set the speed of the movement (you might need to adjust this).
      const speed = distance / 100; // Example ratio for speed calculation.

      // Set the new position and update the current index.
      setMarkerPosition(nextPosition);
      setCurrentIndex(nextIndex);

      // Wait some time before moving to the next point.
      setTimeout(moveMarker, speed);
    };

    // Start the movement if we have more than one point to move to.
    if (simulatedDataStream.length > 1) {
      moveMarker();
    }

    // This clean-up function will clear the timeout when the component unmounts.
    return () => {
      // Clear the timeout if it's set.
    };
  }, [currentIndex, markerPosition, map]);

  useEffect(() => {
    // Fly to the new marker position to follow the marker.
    if (map) {
      map.flyTo(markerPosition, map.getZoom(), { animate: true });
    }
  }, [markerPosition, map]);

  return (
    <Marker position={markerPosition} icon={defaultIcon}>
      <Popup>Moving rescue team</Popup>
    </Marker>
  );
};




const MyMap = () => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching location: ', error.message);
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  }, []);
  console.log(position);

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <MapContainer center={position} zoom={13} style={{ height: '500px', width: '90%' }}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={defaultIcon}>
            <Popup>You are here! <br /> Easily customizable.</Popup>
          </Marker>
          <MovingMarker />
          <Polyline positions={simulatedDataStream} color='blue' />
        </MapContainer>
        <div style={{ width: '50%', padding: '1rem' }}>
        <StatusIndicator
            status="Operational"
            title="Zásahy"
            description="Všetky jednotky sú operatívne."
            details="Detailné informácie o aktuálnej operatívnosti jednotiek."
          />
          <StatusIndicator
            status="Warning"
            title="Počasie"
            description="Očakávané silné búrky."
            details="Detailné informácie o očakávanom počasí."
          />
          <StatusIndicator
            status="Critical"
            title="Doprava"
            description="Dopravná nehoda na hlavnej ceste."
            details="Detailné informácie o dopravnej situácii."
          />
        </div>
        <NotificationArea />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <ResourceOverview />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <IncidentLog />
        </div>
      </div>
      <DashboardSummary />
      {/* <CommunicationTools /> */}
      
    </>
  );
};

export default MyMap;

