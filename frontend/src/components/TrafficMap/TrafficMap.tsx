import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngTuple, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.divIcon({
    className: 'custom-icon',
    html: '<span class="material-icons">place</span>',
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
    popupAnchor: [0, -12.5],
  });
  

const TrafficMap: React.FC = () => {
  const [center, setCenter] = useState<LatLngTuple | null>(null);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log(error);
      } 
    );
  }, []);

  if (!center) {
    return null;
  }

  return (
    <MapContainer center={center} zoom={10} style={{ height: "600px", width: "600px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Example Marker for an accident */}
      <Marker position={center} icon={customIcon}>
        <Popup>
          Accident at XYZ Road
          <br />3 Vehicles Involved
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default TrafficMap;
