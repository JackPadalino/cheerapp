'use client';

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from 'react';
import { Profile } from '@/types';

// defining types for context and provider
export type UserContextType = {
  // user information
  signedIn: boolean;
  setSignedIn: Dispatch<SetStateAction<boolean>>;
  // profile
  profile: Profile | undefined;
  setProfile: Dispatch<SetStateAction<Profile | undefined>>;
  // reset all context state
  resetUserContext: () => void;
};

export type UserContextProviderProps = {
  children: ReactNode;
};

// create the context object
export const UserContext = createContext<UserContextType | []>([]);

// create the provider to pass props to components
export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  // user information
  const [signedIn, setSignedIn] = useState<boolean>(false);
  // profile
  const [profile, setProfile] = useState<Profile | undefined>(
    undefined
  );
  

  const resetUserContext = () => {
    setSignedIn(false);
    setProfile(undefined);
  };

  // values and functions that will be provided to our app's components
  const value: UserContextType = {
    signedIn,
    setSignedIn,
    profile,
    setProfile,
    resetUserContext,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};