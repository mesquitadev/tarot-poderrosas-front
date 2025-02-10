import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';

const PrivateRoute: React.FC = () => {
  const { token } = useAuth();

  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to='/' />
  );
};

const PublicRoute: React.FC = () => {
  const { token } = useAuth();

  return token ? <Navigate to='/inicio' /> : <Outlet />;
};

export { PrivateRoute, PublicRoute };
