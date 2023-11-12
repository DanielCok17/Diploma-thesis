import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const determineTabValue = (): number => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/other-cars-info":
        return 1;
      case "/vehicle-sensors":
        return 2;
      case "/public-reports":
        return 3;
      case "/severity-estimation":
        return 4;
      case "/test-data":
        return 5;
      case "/dispatch-recommendation":
        return 6;
      case "/dashboard":
        return 7;
      // case '/analysis':
      //   return 7 ;
      // case '/data':
      //   return 8 ;
      case "/passenger-info":
        return 7;
      default:
        return 0;
    }
  };

  const handleTabClick = (event: React.ChangeEvent<{}>, newValue: number): void => {
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/other-cars-info");
        break;
      case 2:
        navigate("/vehicle-sensors");
        break;
      case 3:
        navigate("/public-reports");
        break;
      case 4:
        navigate("/severity-estimation");
        break;
      case 5:
        navigate("/test-data");
        break;
      case 6:
        navigate("/dispatch-recommendation");
        break;
      case 7:
        navigate("/dashboard");
        break;
      // case 7:
      //   navigate('/analysis');
      //   break;
      // case 8:
      //   navigate('/data');
      // break;
      case 7:
        navigate("/passenger-info");
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="sticky" color="default" elevation={0} className="app-bar">
      <Toolbar className="toolbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant={isMobile ? "h6" : "h4"} noWrap>
          Smart Rescue System
        </Typography>
        {isMobile ? (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Tabs
            value={determineTabValue()}
            onChange={handleTabClick}
            indicatorColor="primary"
            textColor="primary"
            className="tabs"
            aria-label="header tabs"
          >
            <Tab label="Home" />
            <Tab label="Other Cars Info" />
            <Tab label="Vehicle Sensors" />
            <Tab label="Public Reports" />
            <Tab label="Severity Estimation" />
            <Tab label="Test data" />
            {/* <Tab label="Dispatch Recommendation" /> */}
            <Tab label="Dashboard" />
            {/* <Tab label="Analysis" />
            <Tab label="Data" /> */}
            <Tab label="Passenger Info" />
          </Tabs>
        )}
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          {[
            "Home",
            "Other Cars Info",
            "Vehicle Sensors",
            "Public Reports",
            "Severity Estimation",
            "Test data",
            "Dashboard",
            "Analysis",
            "Data",
          ].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                handleTabClick({} as React.ChangeEvent<{}>, index);
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
