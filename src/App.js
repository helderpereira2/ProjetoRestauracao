import { useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import AppContext from "./AppContext"

import productsData from './exampleData/produtos.json';
import { getAllProducts } from './services/productsService';

const App = () => {
  const content = useRoutes(routes);

  const updateCurrentUser = (user) => {
    setCurrentUser(user);

    if (user) {
      getAllProducts((response) => {
        response = JSON.parse(response);
        setProducts(response);
      }, (error) => {
        console.log(error);
      });
    }
  }

  const [currentUser, setCurrentUser] = useState(null);

  const [products, setProducts] = useState([]);
  //let products = JSON.parse(JSON.stringify(productsData));
  //console.log(products)

  return (
    <AppContext.Provider value={{
      currentUser: currentUser,
      setCurrentUser: updateCurrentUser,

      products: products,
      setProducts: setProducts
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
