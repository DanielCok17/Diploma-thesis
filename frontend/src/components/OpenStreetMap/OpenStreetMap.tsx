import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";

// Fix the default icon issue with Leaflet 1.x
const defaultIcon = new Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const MyMap = () => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching location: ", error.message);
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          You are here! <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
