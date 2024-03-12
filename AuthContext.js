// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const AuthContext = createContext(null); 

export const AuthProvider = ({ children }) => {
  const { isSignedIn, user } = useUser();
  const [authState, setAuthState] = useState({ isSignedIn: false, user: null });

  useEffect(() => {
    setAuthState({ isSignedIn, user });
  }, [isSignedIn, user]);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



