import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import SidebarLayout from '@/components/Layout';

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { token } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (token && isPrivate) {
          return (
            <SidebarLayout>
              <Component />
            </SidebarLayout>
          );
        }

        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/inicio',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
export default Route;
