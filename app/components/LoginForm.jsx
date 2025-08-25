'use client';

import { useState, useEffect } from 'react';
import { useFirebaseAuth } from './FirebaseAuthProvider';
import { useAuth } from './TokenAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Shield, AlertCircle, Chrome, Key } from 'lucide-react';

export default function LoginForm() {
  const { login: firebaseLogin, loading, error, clearError } = useFirebaseAuth();
  const { login: tokenLogin } = useAuth();
  const [isLogging, setIsLogging] = useState(false);
  const [apiToken, setApiToken] = useState('');
  const [tokenError, setTokenError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!apiToken.trim()) {
      setTokenError('API token is required');
      return;
    }

    setIsLogging(true);
    clearError();
    setTokenError(null);
    
    try {
      // First authenticate with Google
      await firebaseLogin();
      
      // Then authenticate with API token
      const result = await tokenLogin(apiToken.trim());
      if (!result.success) {
        setTokenError(result.error || 'Invalid API token');
      }
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
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Enter your API token and authenticate with Google
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Error Alerts */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {tokenError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {tokenError}
                </AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiToken">API Token</Label>
                <Input
                  id="apiToken"
                  type="password"
                  placeholder="Enter your admin API token"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                  disabled={isLogging}
                />
              </div>

              <Button
                type="submit"
                disabled={isLogging || loading || !apiToken.trim()}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                {(isLogging || loading) ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <div className="flex items-center mr-3">
                      <Chrome className="h-4 w-4 mr-1" />
                      <Key className="h-4 w-4" />
                    </div>
                    Login with Google & Token
                  </>
                )}
              </Button>
            </form>

            {/* Info Section */}
            <div className="pt-4 space-y-3">
              <div className="border-t pt-4">
                <div className="text-center space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    🔐 Secure Authentication
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• API token + Google authentication</li>
                    <li>• Email whitelist verification</li>
                    <li>• Double security for admin access</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Enter your API token and click to authenticate with Google.
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
            Powered by Firebase Authentication & API Tokens
          </p>
        </div>
      </div>
    </div>
  );
}