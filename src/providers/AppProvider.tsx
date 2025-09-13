import React, { PropsWithChildren } from 'react';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ErrorBoundary from '@/handlers/ErrorBoundary';
import { AuthProvider } from '@/contexts/AuthContext';

 type AppProviderProps = PropsWithChildren<Record<string, unknown>>;

 const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <ErrorBoundary>
    <Provider store={store}>
      <LoadingProvider>
        <AuthProvider>{children}</AuthProvider>
      </LoadingProvider>
    </Provider>
  </ErrorBoundary>
 );

 export default AppProvider;
