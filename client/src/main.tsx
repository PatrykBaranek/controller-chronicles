import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Theme from './Theme';
import Header from './components/Header/Header';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme>
      <Header />
      <App />
      <Toaster />
    </Theme>
  </React.StrictMode>,
);
