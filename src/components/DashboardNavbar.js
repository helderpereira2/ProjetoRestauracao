import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';

import { userLogout } from '../services/authenticationService'

const DashboardNavbar = ({ onMobileNavOpen }) => {
  const navigate = useNavigate();
  const [notifications] = useState([]);

  const logout = () => {
    userLogout((response) => {
      localStorage.removeItem('authenticationToken');
      navigate('/login');
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <AppBar elevation={0}>
      <Toolbar>

        { /*  <RouterLink to="/"> <Logo /> </RouterLink> */}


        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit" size="large">
          <Badge badgeContent={notifications.length} color="primary" variant="dot" >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" size="large" onClick={() => logout()}>
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar >
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
