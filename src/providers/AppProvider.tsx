import React, { PropsWithChildren } from 'react';

import { LoadingProvider } from '@/contexts/LoadingContext';
import ErrorBoundary from '@/handlers/ErrorBoundary';
import { AuthProvider } from '@/contexts/AuthContext';

type AppProviderProps = PropsWithChildren<Record<string, unknown>>;

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <ErrorBoundary>
    <LoadingProvider>
      <AuthProvider>{children}</AuthProvider>
    </LoadingProvider>
  </ErrorBoundary>
);

export default AppProvider;
