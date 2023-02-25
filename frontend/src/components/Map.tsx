import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "../App.css";

const googleMapsApiKey: string = process.env.REACT_APP_GOOGLE_API_KEY || "";
const env_lat: number = Number(process.env.REACT_APP_LAT) || 0;
const env_lng: number = Number(process.env.REACT_APP_LNG) || 0;

const Map = () => {
  const [latitute, setLatitute] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });
  const center = useMemo(() => ({ lat: env_lat || latitute, lng: env_lng || longitude}), []);

  // Get the user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitute(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading map...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" center={center} zoom={10} />
      )}
    </div>
  );
};

export default Map;
