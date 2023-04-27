import { RequireAuth } from 'react-auth-kit';

const PrivateRoute = ({ component }: { component: JSX.Element }) => {
  return <RequireAuth loginPath='/login'>{component}</RequireAuth>;
};

export default PrivateRoute;
