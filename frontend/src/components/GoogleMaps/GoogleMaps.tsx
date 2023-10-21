import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, TrafficLayer, Marker, InfoWindow } from "@react-google-maps/api";

const GoogleMaps: React.FC = () => {
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [markerPosition, setMarkerPosition] = useState(center);

  useEffect(() => {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = { lat: position.coords.latitude, lng: position.coords.longitude };
          setCenter(newPos);
          setMarkerPosition(newPos);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const containerStyle = {
    width: "600px",
    height: "600px",
    margin: "auto", // This will help in centering the map container
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCmEuEWkQz9MtVuOewJAYOu7FhYVZWGgi4">
      <div style={containerStyle}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          // size 300 and 300
        >
          {/* <TrafficLayer autoUpdate /> */}
          <TrafficLayer  />
          <Marker position={markerPosition} icon={{url: "https://img.icons8.com/color/48/000000/car--v1.png"}}>
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
  );
};

export default GoogleMaps;

