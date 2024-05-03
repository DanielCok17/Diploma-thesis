import React, { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isLoggedIn: boolean;
  role: string | null; // Add role to the context type
  login: (role: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!Cookies.get('role'));
  const [role, setRole] = useState<string | null>(Cookies.get('role') || null);
  // set userId
  const [userId, setUserId] = useState<string | null>(Cookies.get('userId') || null);

  const login = (role: string, userId: string) => {
    setIsLoggedIn(true);
    setRole(role);
    setUserId(userId);
    Cookies.set('role', role, { expires: 7 }); // Sets the role cookie with a 7-day expiration
    Cookies.set('userId', userId, { expires: 7 }); // Sets the userId cookie with a 7-day expiration
  };

  const logout = () => {
    Cookies.remove('role');
    Cookies.remove('token');
    Cookies.remove('userId');
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
