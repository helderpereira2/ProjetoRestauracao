import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  (
    <SnackbarProvider maxSnack={4} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} hideIconVariant={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  ),
  document.getElementById('root')
);
