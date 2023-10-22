import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import TrafficMap from "./components/TrafficMap/TrafficMap";
import  GoogleMaps  from "./components/GoogleMaps/GoogleMaps";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
      <Route path="/"  element={<GoogleMaps />} />
        <Route path="/"  element={<TrafficMap />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;