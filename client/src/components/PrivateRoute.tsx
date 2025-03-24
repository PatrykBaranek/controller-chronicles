import { Navigate } from 'react-router';

const PrivateRoute = ({ Component }: { Component: React.ComponentType<any> }) => {
  const isAuthenticated = false;
  return isAuthenticated ? <Component /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
