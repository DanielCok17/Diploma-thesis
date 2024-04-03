import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const LiveMap: React.FC = () => {
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

  function LocationMarker() {
    const map = useMap();

    useEffect(() => {
      map.flyTo(position, map.getZoom());
    }, [position, map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '50vh', width: '50%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default LiveMap;
