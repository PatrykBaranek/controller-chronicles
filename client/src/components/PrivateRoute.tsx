import { Navigate } from 'react-router-dom';
import { authClient } from '../api/auth-client';

const PrivateRoute = ({ Component }: { Component: React.ComponentType }) => {
  const { data: session, isPending } = authClient.useSession();
  
  if (isPending) return null;
  
  return session ? <Component /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
