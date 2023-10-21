import React from "react";
import { TrafficLayer } from "@react-google-maps/api";

const CustomTrafficLayer: React.FC<{ trafficLayer: TrafficLayer }> = ({ trafficLayer }) => {
  return (
    <TrafficLayer
    />
  );
};

export default CustomTrafficLayer;