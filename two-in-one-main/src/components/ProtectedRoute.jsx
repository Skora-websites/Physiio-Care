import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePlatform } from '../context/PlatformContext';

const ProtectedRoute = ({ children, expectedPlatform }) => {
  const { activePlatform, selectPlatform } = usePlatform();
  const location = useLocation();

  useEffect(() => {
    // If the user navigates directly (e.g., bookmark, refresh), set the platform
    if (!activePlatform) {
      selectPlatform(expectedPlatform);
    }
  }, [activePlatform, expectedPlatform, selectPlatform]);

  // Only block if they explicitly have the wrong platform set AND are trying to cross-navigate
  // But actually, if they are deep linking, it's fine to just render.
  if (activePlatform && activePlatform !== expectedPlatform) {
    // Optionally redirect, or just force the switch.
    // We'll force the switch to avoid blocking valid URLs
    selectPlatform(expectedPlatform);
  }

  // Always render children. The wrapper shouldn't block public routes.
  return children;
};

export default ProtectedRoute;
