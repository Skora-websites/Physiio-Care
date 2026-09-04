import React, { createContext, useContext, useState } from 'react';

const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
  const [activePlatform, setActivePlatform] = useState(null);

  const selectPlatform = (platformId) => {
    setActivePlatform(platformId);
  };

  const clearPlatform = () => {
    setActivePlatform(null);
  };

  return (
    <PlatformContext.Provider value={{ activePlatform, selectPlatform, clearPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => useContext(PlatformContext);
