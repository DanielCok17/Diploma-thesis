import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import TrafficMap from "./components/TrafficMap/TrafficMap";
import  GoogleMaps  from "./components/GoogleMaps/GoogleMaps";
import "./App.css";


function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
      <Route path="/"  element={<GoogleMaps />} />
        <Route path="/"  element={<TrafficMap />} />
      {/* <Route path="/"  element={<Home />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;