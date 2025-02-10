import AppRoutes from './routes';
import AppProvider from '@/providers/AppProvider';
import { SnackbarProvider } from 'notistack';
import './main.css';

function App() {
  return (
    <SnackbarProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </SnackbarProvider>
  );
}

export default App;
