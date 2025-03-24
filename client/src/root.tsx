import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import errorIco from '#/assets/errorIco.svg';
import { toast } from 'sonner';
import { CircularProgress } from '@mui/material';

import Theme from './Theme';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast('Error', {
        className: 'default',
        description: error?.message,
        duration: 5000,
        icon: <img src={errorIco} />,
        position: 'top-right',
      });
    },
  }),
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
        <title>Controller Chronicles</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Theme>
          <Outlet />
        </Theme>
      </LocalizationProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export function HydrateFallback() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <CircularProgress size={50} />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
