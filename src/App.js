import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import AppContext from "./AppContext"

const App = () => {
  const content = useRoutes(routes);

  return (
    <AppContext.Provider value={{
      restaurantName: "Restaurant X"
    }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {content}
        </ThemeProvider>
      </StyledEngineProvider>
    </AppContext.Provider>
  );
};

export default App;
