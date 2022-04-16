import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import MainNavbar from './MainNavbar';

const MainLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const MainLayoutWrapper = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64
});

const MainLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const MainLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

export default function MainLayout() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('authenticationToken')) {
      navigate('/app/dashboard', { replace: true });
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null
  } else {
    return (
      <MainLayoutRoot>
        <MainNavbar />
        <MainLayoutWrapper>
          <MainLayoutContainer>
            <MainLayoutContent>
              <Outlet />
            </MainLayoutContent>
          </MainLayoutContainer>
        </MainLayoutWrapper>
      </MainLayoutRoot>
    )
  }
};

MainLayout;
