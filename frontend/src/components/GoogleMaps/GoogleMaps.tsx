import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, TrafficLayer, Marker, InfoWindow } from "@react-google-maps/api";
import NotificationSystem from "../NotificationSystem/NotificationSystem";

const api_key: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

const GoogleMaps: React.FC = () => {
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [markerPosition, setMarkerPosition] = useState(center);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = { lat: position.coords.latitude, lng: position.coords.longitude };
          setCenter(newPos);
          setMarkerPosition(newPos);
          console.log(newPos);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // Define container styles for responsiveness
  const containerStyle = {
    width: "100%",   // take full width
    height: "80vh",  // take 80% of viewport height
    margin: "auto",
  };

  // Adjust map style based on screen size
  const mapContainerStyle = window.innerWidth <= 768 ? 
    { width: "100%", height: "60vh" } : containerStyle;

  const isGoogleMapScriptLoaded = window.google && window.google.maps;

  return (
    <>
      {isGoogleMapScriptLoaded ? (
        <div style={containerStyle}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
            <TrafficLayer />
            <Marker position={markerPosition} icon={{ url: "https://img.icons8.com/color/48/000000/car--v1.png" }}>
              <InfoWindow position={markerPosition}>
                <div>
                  Accident at XYZ Road
                  <br />3 Vehicles Involved
                </div>
              </InfoWindow>
            </Marker>
          </GoogleMap>
        </div>
      ) : (
        <LoadScript googleMapsApiKey={api_key}>
          <div style={containerStyle}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
              <TrafficLayer />
              <Marker position={markerPosition} icon={{ url: "https://img.icons8.com/color/48/000000/car--v1.png" }}>
                <InfoWindow position={markerPosition}>
                  <div>
                    Accident at XYZ Road
                    <br />3 Vehicles Involved
                  </div>
                </InfoWindow>
              </Marker>
            </GoogleMap>
          </div>
        </LoadScript>
      )}
      <NotificationSystem />
    </>
  );
};

export default GoogleMaps;