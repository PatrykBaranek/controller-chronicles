import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider } from 'react-auth-kit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { refreshToken } from './api/gamesApi';
import PrivateRoute from './components/PrivateRoute';
import Layout from './Layout';
import Collections from './pages/Collections';
import GameDetails from './pages/GameDetails';
import Games from './pages/Games';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Podcasts from './pages/Podcasts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'games',
        element: <Games />,
      },
      {
        path: 'games/:id',
        element: <GameDetails />,
      },
      { path: 'podcasts', element: <Podcasts /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      {
        path: '/profile',
        children: [
          {
            index: true,
            element: <PrivateRoute Component={Profile} />,
          },
          {
            path: 'collections',
            element: <PrivateRoute Component={Collections} />,
          },
        ],
      },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      refresh={refreshToken}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
