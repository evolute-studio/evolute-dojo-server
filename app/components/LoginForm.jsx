'use client';

import { useState } from 'react';
import { useFirebaseAuth } from './FirebaseAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Shield, AlertCircle, Chrome } from 'lucide-react';

export default function LoginForm() {
  const { login, loading, error, clearError } = useFirebaseAuth();
  const [isLogging, setIsLogging] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLogging(true);
    clearError();
    
    try {
      await login();
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Evolute Admin</h1>
          <p className="text-muted-foreground">
            Secure access to blockchain game administration
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in with your authorized Google account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={loading || isLogging}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              {(loading || isLogging) ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Chrome className="mr-3 h-5 w-5" />
                  Continue with Google
                </>
              )}
            </Button>

            {/* Info Section */}
            <div className="pt-4 space-y-3">
              <div className="border-t pt-4">
                <div className="text-center space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    🔐 Secure Access
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Google account authentication</li>
                    <li>• Email whitelist verification</li>
                    <li>• Admin panel access only</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Only authorized administrators can access this panel.
                  <br />
                  Contact your system administrator if you need access.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Evolute Dojo Administration Panel
            <br />
            Powered by Firebase Authentication
          </p>
        </div>
      </div>
    </div>
  );
}