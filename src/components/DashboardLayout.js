import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { renewToken } from '../services/authenticationService'
import AppContext from '../AppContext';

const DashboardLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

export default function DashboardLayout() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const context = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem('authenticationToken')) {
      navigate('/login', { replace: true });
    } else {
      renewToken(localStorage.getItem('refreshToken'), (response) => {
        response = JSON.parse(response)
        context.setCurrentUser(response['user']);
        localStorage.setItem('authenticationToken', response['access_token']);
        localStorage.setItem('refreshToken', response['refresh_token']);
      }, (error) => {
        console.log(error);
      })
    }
  }, [location.pathname]);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        context={context}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};
