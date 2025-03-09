'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Theme from '../../src/Theme.tsx';

const App = dynamic(() => import('../../src/App.tsx'), { ssr: false });

export function ClientOnly() {
  return (
    <Theme>
      <App />
    </Theme>
  );
}
