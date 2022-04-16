import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Divider, Drawer, Hidden, List, Typography } from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  Calendar as CalendarIcon,
  Users as UsersIcon,
  DollarSign as DollarIcon
} from 'react-feather';
import NavItem from './NavItem';

const restaurant = {
  avatar: 'https://www.linguahouse.com/linguafiles/md5/d01dfa8621f83289155a3be0970fb0cb',
  name: 'Restaurante X'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/sales',
    icon: DollarIcon,
    title: 'Vendas'
  },
  {
    href: '/app/forecast',
    icon: CalendarIcon,
    title: 'Previsões'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Produtos'
  },
  {
    href: '/app/myData',
    icon: ShoppingBagIcon,
    title: 'Os Meus Dados'
  },
  /*
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Desperdício'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Eventos'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  } */
];

const DashboardSidebar = ({ onMobileClose, openMobile, context }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2 }} >
        <Avatar component={RouterLink} src={restaurant.avatar} sx={{ cursor: 'pointer', width: 64, height: 64 }} to="/app/account" />
        {context.currentUser &&
          <Typography color="textPrimary" variant="h5">
            {context.currentUser['restName']}
          </Typography>
        }

      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (<NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer anchor="left" onClose={onMobileClose} open={openMobile} variant="temporary" PaperProps={{ sx: { width: 256 } }}>
          {content}
        </Drawer>
      </Hidden>

      <Hidden xlDown>
        <Drawer anchor="left" open variant="persistent" PaperProps={{ sx: { width: 256, top: 64, height: 'calc(100% - 64px)' } }}>
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = { onMobileClose: PropTypes.func, openMobile: PropTypes.bool };
DashboardSidebar.defaultProps = { onMobileClose: () => { }, openMobile: false };

export default DashboardSidebar;
