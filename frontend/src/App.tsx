import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import TrafficMap from "./components/TrafficMap/TrafficMap";
import  GoogleMaps  from "./components/GoogleMaps/GoogleMaps";
import Dashboard from "./components/Dashboard/Dashboard";
import VehicleSensors from "./components/VehicleSensors/VehicleSensors";
import PublicReports from "./components/PublicReports/PublicReports";
import SeverityEstimation from "./components/SeverityEstimation/SeverityEstimation";
import DispatchRecommendation from "./components/DispatchRecommendation/DispatchRecommendation";
import OtherCarsInfo from "./components/OtherCarsInfo/OtherCarsInfo";
import PassengerInfo from "./components/Passengers/PassengerInfo";
import "./App.css";

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
      <Route path="/"  element={<GoogleMaps />} />
        <Route path="/"  element={<TrafficMap />} />
        <Route path="/vehicle-sensors" element={<VehicleSensors />} />
        <Route path="/public-reports" element={<PublicReports />} />
        <Route path="/severity-estimation" element={<SeverityEstimation />} />
        <Route path="/dispatch-recommendation" element={<DispatchRecommendation />} />
        <Route path="/other-cars-info" element={<OtherCarsInfo />} />
        <Route path="/passenger-info" element={<PassengerInfo />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;