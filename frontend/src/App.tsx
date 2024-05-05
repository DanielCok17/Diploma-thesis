import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/UserHeader";
import TrafficMap from "./components/TrafficMap/TrafficMap";
import GoogleMaps from "./components/GoogleMaps/GoogleMaps";
import Dashboard from "./components/Dashboard/Dashboard";
import VehicleSensors from "./components/VehicleSensors/VehicleSensors";
import PublicReports from "./components/PublicReports/PublicReports";
import SeverityEstimation from "./components/SeverityEstimation/SeverityEstimation";
import DispatchRecommendation from "./components/DispatchRecommendation/DispatchRecommendation";
import OtherCarsInfo from "./components/OtherCarsInfo/OtherCarsInfo";
import PassengerInfo from "./components/Passengers/PassengerInfo";
import MyMap from "./components/OpenStreetMap/OpenStreetMap";
import DataTable from "./components/TestData/TestData";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import RescuerDashboard from "./components/RescuerDashboard/RescuerDashboard";
import { useAuth } from "./components/Login/AuthContext";
import AccidentDetails from "./components/AccidentDetails/AccidentDetails";
import ResourceOverview from "./components/ResourceOverview/ResourceOverview";
import ReportingAnalytics from "./components/ReportingAnalytics/ReportingAnalytics";
import NewRescueCenter from "./components/SuperAdmin/NewRescueCenter";
import SuperAdminHeader from "./components/Header/SuperAdminHeader";
import Cookies from 'js-cookie';
import ListOfRescueCenters from "./components/ListOfRescueCenters/ListOfRescueCenters";
import Rescuer2Header from "./components/Header/Rescuer2Header";
import RealTimeIncidentMap from "./components/Rescuer2/RealTimeIncidentMap";
import AllAccidents from "./components/AllAccidents/AllAccidents";
import "./App.css";

function App() {
  const { isLoggedIn } = useAuth();

  const role = Cookies.get('role');

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <>
        {role === 'superadmin' &&  <SuperAdminHeader />}
        {role === 'admin' && <Header />}
        {role === 'user' && <Header />}
        {role === 'dispatcher' && <Header />}
        {role === 'rescuer2' && <Rescuer2Header />}
        {role === 'rescuer' && <Rescuer2Header />}
        {role === 'policeman' && <Rescuer2Header />}
        {role === 'firefighter' && <Rescuer2Header />}
            <Routes>
              {/* <Route path="/admin" element={<MyMap />} /> */}
              <Route path="/admin" element={<RescuerDashboard />} />
              <Route path="/user" element={<RescuerDashboard />} />
              <Route path="/rescuer2" element={<RealTimeIncidentMap />} />
              <Route path="/test-data" element={<DataTable />} />
              <Route path="/vehicle-sensors" element={<VehicleSensors />} />
              <Route path="/public-reports" element={<PublicReports />} />
              <Route path="/severity-estimation" element={<SeverityEstimation />} />
              <Route path="/dispatch-recommendation" element={<DispatchRecommendation />} />
              <Route path="/other-cars-info" element={<OtherCarsInfo />} />
              <Route path="/passenger-info" element={<PassengerInfo />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/accident-details/:id" element={<AccidentDetails />} />
              <Route path="/resource-overview" element={<ResourceOverview />} />
              <Route path="/reporting-analytics" element={<ReportingAnalytics />} />
              <Route path="/new-rescue-center" element={<NewRescueCenter />} />
              <Route path="/list-of-rescue-centers" element={<ListOfRescueCenters />} />
              <Route path="/allAccidents" element={<AllAccidents />} />
            </Routes>
          </>
        ) : (
          <Routes>
            {/* Assuming Login is adjusted to be a Route for consistency */}
            <Route path="*" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
