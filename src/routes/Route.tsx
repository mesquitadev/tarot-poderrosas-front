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
  const { authToken } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (authToken && isPrivate) {
          return (
            <SidebarLayout>
              <Component />
            </SidebarLayout>
          );
        }

        return isPrivate === !!authToken ? (
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
