'use client';

import { useFirebaseAuth } from './FirebaseAuthProvider';
import LoginForm from './LoginForm';
import { Loader2 } from 'lucide-react';

export default function ProtectedLayout({ children }) {
  const { isAuthenticated, loading } = useFirebaseAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-500" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Show protected content if authenticated
  return <>{children}</>;
}