import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import Forecast from './pages/Forecast';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Sales from './pages/Sales';
import Products from './pages/Products';
import DataUpload from './pages/DataUpload';


const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'forecast', element: <Forecast /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <Products /> },
      { path: 'sales', element: <Sales /> },
      { path: 'myData', element: <DataUpload /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to={localStorage.getItem("authenticationToken") ? "/app/dashboard" : "/login"} /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
