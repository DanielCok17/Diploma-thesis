import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';

const SuperAdminHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // This will check if the screen size is 'sm' or smaller

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCreateCenter = () => {
    navigate('/list-of-rescue-centers');
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const handleCreateCenter2 = () => {
    navigate('/new-rescue-center');
  };

  const drawer = (
    <List>
      <ListItem button onClick={handleCreateCenter2}>
        <ListItemText primary="Super admin dashboard" />
      </ListItem>
      <ListItem button onClick={handleCreateCenter}>
        <ListItemText primary="List of Rescue Centers" />
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static">
      <Toolbar>
      {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
  
</Typography>
<Button color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }} onClick={handleCreateCenter2}>
  Super admin dashboard
</Button>
<Button color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }} onClick={handleCreateCenter}>
  List of Rescue Centers
</Button>
<Button color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }} onClick={handleLogout}>
  Logout
</Button>


        
      </Toolbar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default SuperAdminHeader;
