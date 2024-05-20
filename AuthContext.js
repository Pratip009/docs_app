

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { isSignedIn: initialIsSignedIn, user: initialUser } = useUser();
  const [authState, setAuthState] = useState({
    isSignedIn: initialIsSignedIn,
    user: initialUser,
  });

  useEffect(() => {
    // Initialize the authentication state with the initial values
    setAuthState({ isSignedIn: initialIsSignedIn, user: initialUser });
  }, [initialIsSignedIn, initialUser]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
