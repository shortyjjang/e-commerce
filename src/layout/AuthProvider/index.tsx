/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

interface ContextType {
  isAuthenticated: boolean;
}

const defaultContextValue: ContextType = {
  isAuthenticated: false,
};

const Context = createContext<ContextType>(defaultContextValue);

/**
 *
 * @constructor
 */
export const useAuth = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("Context must be used within an provider.");
  }
  return context;
};

/**
 * Provider
 * @param children
 * @constructor
 */
const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { status } = useSession()
  return (
      <Context.Provider value={{ isAuthenticated: status === 'authenticated' }}>
        {children}
      </Context.Provider>
  );
};

export default AuthProvider;
