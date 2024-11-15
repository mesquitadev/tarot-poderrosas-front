import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import AppProvider from '@/providers/AppProvider';
import { theme } from './styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <BrowserRouter>
        <SnackbarProvider>
          <AppProvider>
            <Routes />
          </AppProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
