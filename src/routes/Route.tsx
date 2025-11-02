import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import GuestPrompt from '@/components/GuestPrompt';

const PrivateRoute: React.FC = () => {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token);
  const location = useLocation();
  const allowGuestOnHome = location.pathname === '/inicio' || location.pathname === '/inicio/';

  return <Layout>{isAuthenticated || allowGuestOnHome ? <Outlet /> : <GuestPrompt />}</Layout>;
};

const PublicRoute: React.FC = () => {
  return <Outlet />;
};

export { PrivateRoute, PublicRoute };
