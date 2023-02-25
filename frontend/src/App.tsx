import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/map" component={Map} />
      </Switch>
    </Router>
  );
};

export default App;
