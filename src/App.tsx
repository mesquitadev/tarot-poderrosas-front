import AppRoutes from './routes';
import AppProvider from '@/providers/AppProvider';
import { SnackbarProvider } from 'notistack';
import './main.css';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';

function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
