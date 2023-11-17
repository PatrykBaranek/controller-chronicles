import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Games from './pages/Games';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from 'react-auth-kit';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
        children: [{ path: ':id', element: <h1>game :id</h1> }],
      },
      { path: 'podcasts', element: <h1>podcasts</h1> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      {
        path: '/profile',
        element: <Profile />,
        children: [
          {
            path: 'collections',
            element: <h1>collections</h1>,
            children: [{ path: ':id', element: <h1>collections :id</h1> }],
          },
        ],
      },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider authType={'cookie'} authName={'_auth'} cookieDomain={window.location.hostname}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
