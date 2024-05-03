import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Cookies from 'js-cookie';
import L, { Marker as LeafletMarker } from 'leaflet';
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

interface Accident {
  _id: string;
  timestamp: Date;
  vin: string;
  last_timestamp_check: Date;
  acceleration: number;
  speed: number;
  license_plates: string[];
  coordinates: number[]; // [latitude, longitude]
  violations: Array<{
    type: string;
    coordinates: number[]; // [latitude, longitude]
    timestamp: Date;
  }>;
  driver: {
    seatbelt: boolean;
    drowsiness: boolean;
    heart_rate: number[];
  };
  passengers_num: number;
}

interface Props {
  accidents: Accident[];
}

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

interface AccidentMarkersProps {
  accidents: Accident[];
}

const LiveMap: React.FC = () => {
  const [position, setPosition] = useState<[number, number]>([48.183527, 17.133058]);
  const [rescueCenter, setRescueCenter] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = Cookies.get('userId');
  let url = process.env.REACT_APP_ENVIRONMENT === "prod" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  const [pendingAccidents, setPendingAccidents] = useState<Accident[]>([]);
  const navigate = useNavigate(); // Inicializujeme hook useNavigate

  if (!url) {
    url = process.env.REACT_APP_PROD_URL;
  }


  useEffect(() => {
    // Fetch current user position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching location:', error.message);
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );

    // Fetch rescue centers
    const fetchRescueCenter = async () => {
      try {
        const response = await axios.get(`${url}/rescue-center/user/${userId}`);
        setRescueCenter(response.data);
      } catch (error) {
        console.error('Error fetching rescue centers:', error);
        setError('Failed to load rescue centers');
      }
    };

    fetchRescueCenter();
  }, []);

  // Inside your LiveMap component
useEffect(() => {
  const fetchPendingAccidents = async () => {
    try {
      const response = await axios.get(`${url}/accident/pending`);
      setPendingAccidents(response.data);
    } catch (error) {
      console.error('Error fetching pending accidents:', error);
    }
  };

  fetchPendingAccidents();
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

  // const AccidentMarkers = () => {
  //   const map = useMap();
  //   const position2 =  [pendingAccidents.coordinates[0], pendingAccidents.coordinates[1]]
  //   useEffect(() => {
  //     map.flyTo(position2, map.getZoom());
  //   }, [position2, map]);

  //   return position === null ? null : (
  //     <Marker position={position}>
  //        <Popup>
  //             VIN: {accident.vin}<br />
  //             Speed: {accident.speed} km/h<br />
  //             Passengers: {accident.passengers_num}
  //           </Popup>
  //     </Marker>
  //   );
  // };

  const handleDetailsClick = (accidentId: string) => {
    console.log('Show details for accident:', accidentId);
    navigate(`/accident-details/${accidentId}`);
  };

  const AccidentMarkers: React.FC<AccidentMarkersProps> = ({ accidents }) => {
    const map = useMap();

  
    useEffect(() => {
      // This assumes accidents are not empty and all have valid coordinates
      if (accidents.length > 0) {
        // Optionally focus the map on the first accident
        const firstAccident = accidents[0];
        console.log('First accident:', firstAccident.coordinates[0], firstAccident.coordinates[1]);
        map.flyTo([firstAccident.coordinates[0], firstAccident.coordinates[1]], map.getZoom());
      }
    }, [accidents, map]);
  
    return (
      <>
        {accidents.map((accident) => (
          <Marker key={accident._id} position={[accident.coordinates[0], accident.coordinates[1]]}>
            <Popup>
              VIN: {accident.vin}<br />
              Speed: {accident.speed} km/h<br />
              Passengers: {accident.passengers_num}<br />
              <button onClick={() => handleDetailsClick(accident._id)}>
                Show Details
              </button>
            </Popup>
          </Marker>
        ))}
      </>
    );
  };
  
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '50vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <LocationMarker /> */}
      <AccidentMarkers  accidents={pendingAccidents} />
      {rescueCenter && (
        <Polygon
          positions={rescueCenter.area.map((coord: any) => [coord.lat, coord.lng])}
          color="blue"
        >
          <Popup>
            <span>{rescueCenter.name}</span>
          </Popup>
        </Polygon>
      )}
    </MapContainer>
  );
};

export default LiveMap;
