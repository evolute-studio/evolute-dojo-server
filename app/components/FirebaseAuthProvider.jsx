'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

const AuthContext = createContext({});

// Email whitelist from environment variables
const getAllowedEmails = () => {
  const whitelist = process.env.NEXT_PUBLIC_EMAIL_WHITELIST || process.env.NEXT_PUBLIC_ALLOWED_EMAILS || '';
  return whitelist.split(',').map(email => email.trim()).filter(email => email);
};

export const useFirebaseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  }
  return context;
};

export function FirebaseAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user?.email);
      
      if (user) {
        // Check if user's email is in whitelist
        const allowedEmails = getAllowedEmails();
        
        if (allowedEmails.length > 0 && !allowedEmails.includes(user.email)) {
          console.warn('User email not in whitelist:', user.email);
          setError(`Access denied. Email ${user.email} is not authorized.`);
          signOut(auth); // Sign out unauthorized user
          setUser(null);
        } else {
          setUser(user);
          setError(null);
        }
      } else {
        setUser(null);
        setError(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check whitelist again after successful Google login
      const allowedEmails = getAllowedEmails();
      
      if (allowedEmails.length > 0 && !allowedEmails.includes(user.email)) {
        await signOut(auth);
        throw new Error(`Access denied. Email ${user.email} is not authorized to access this admin panel.`);
      }
      
      console.log('User logged in successfully:', user.email);
      
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Login cancelled by user');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup blocked by browser. Please allow popups for this site.');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}