// Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import './style.css';  // Import the external CSS file

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleTabClick = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(`Tab ${newValue} clicked`);
  };

  return (
    <AppBar position="sticky" color="default" elevation={0} className="app-bar">
      <Toolbar className="toolbar">
        <Typography variant={isMobile ? 'h6' : 'h4'} noWrap>
          Smart Rescue System
        </Typography>
        <Tabs 
          value={0} 
          onChange={handleTabClick} 
          indicatorColor="primary"
          textColor="primary"
          className="tabs"
          aria-label="header tabs"
        >
          <Tab label="Home" />
          <Tab label="Analysis" />
          <Tab label="Data" />
          <Tab label="Contact" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
