import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, useMediaQuery, useTheme, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './style.css';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const determineTabValue = (): number => {
    switch (location.pathname) {
      case '/':
        return 0;
      case '/dashboard':
        return 1;
      case '/analysis':
        return 2;
      case '/data':
        return 3;
      case '/contact':
        return 4;
      default:
        return 0;
    }
  };

  const handleTabClick: {
    (event: React.ChangeEvent<{}>, newValue: number): void;
    (newValue: number): void;
} = (eventOrValue: React.ChangeEvent<{}> | number, newValue?: number) => {
    let value = 0;
    if (typeof eventOrValue === 'number') {
        value = eventOrValue;
    } else if (newValue !== undefined) {
        value = newValue;
    }

    switch (value) {
        case 0:
            navigate('/');
            break;
        case 1:
            navigate('/dashboard');
            break;
        case 2:
            navigate('/analysis');
            break;
        case 3:
            navigate('/data');
            break;
        case 4:
            navigate('/contact');
            break;
        default:
            break;
    }
};


  return (
    <AppBar position="sticky" color="default" elevation={0} className="app-bar">
      <Toolbar className="toolbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Typography variant={isMobile ? 'h6' : 'h4'} noWrap>
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
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><Tab label="Home" /></Link>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}><Tab label="Dashboard" /></Link>
            <Link to="/analysis" style={{ textDecoration: 'none', color: 'inherit' }}><Tab label="Analysis" /></Link>
            <Link to="/data" style={{ textDecoration: 'none', color: 'inherit' }}><Tab label="Data" /></Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}><Tab label="Contact" /></Link>
          </Tabs>
        )}
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          {['Home', 'Dashboard', 'Analysis', 'Data', 'Contact'].map((text, index) => (
            <ListItem button key={text} onClick={() => {
              handleTabClick(index);
              setDrawerOpen(false);
            }}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
