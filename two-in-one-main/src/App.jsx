import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { PlatformProvider } from './context/PlatformContext';

export default function App() {
  return (
    <PlatformProvider>
      <div className="main-wrapper">
        <AppRoutes />
      </div>
    </PlatformProvider>
  );
}