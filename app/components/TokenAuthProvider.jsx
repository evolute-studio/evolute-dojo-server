'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export function TokenAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (inputToken) => {
    try {
      setIsLoading(true);
      
      // Validate token with backend
      const response = await fetch('/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${inputToken}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setToken(inputToken);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', inputToken);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Invalid token' };
      }
    } catch (error) {
      return { success: false, error: 'Authentication failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
  };

  const value = {
    isAuthenticated,
    token,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within TokenAuthProvider');
  }
  return context;
}