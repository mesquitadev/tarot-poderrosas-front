import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import AppProvider from '@/providers/AppProvider';
import { SnackbarProvider } from 'notistack';
import './main.css';

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
