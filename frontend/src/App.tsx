import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Overview, Users, Revenue, Order, History, Configurations } from "./pages/Overview";

const App: FC = () => {
  return (
    <Router>
            <Sidebar />
            <Switch>
                <Route path="/overview" component={Overview} exact></Route>
                <Route path="/overview/users" component={Users} exact></Route>
                <Route path="/overview/revenue" component={Revenue} exact></Route>
                <Route path="/order" component={Order} exact></Route>
                <Route path="/history" component={History} exact></Route>
                <Route path="/configurations" component={Configurations} exact></Route>
                <Route path="/" component={Map} exact></Route>
            </Switch>
        </Router>
  );
};

export default App;
