import React from 'react';
import Header from '../src/components/Header/Header';
import { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Controller Chronicles',
  description: 'A collection of game controllers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
