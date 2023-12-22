import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }: { Component: React.ComponentType<any> }) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated() ? <Component /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
