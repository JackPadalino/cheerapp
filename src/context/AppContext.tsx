import React, { FC } from 'react';
import { UserContextProvider } from './UserContext';

const AppContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <UserContextProvider>
        {children}
    </UserContextProvider>              
  );
};

export default AppContextProvider;