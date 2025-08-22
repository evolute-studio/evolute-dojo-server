'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertTriangle, Settings, CheckCircle, XCircle } from 'lucide-react';

export default function ProfileErrorModal({ 
  isOpen, 
  onClose, 
  error, 
  currentProfile, 
  fallbackProfile,
  onRetry,
  onSwitchToFallback,
  onOpenSettings
}) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  const handleSwitchToFallback = async () => {
    setIsSwitching(true);
    try {
      await onSwitchToFallback();
    } finally {
      setIsSwitching(false);
    }
  };

  const parseErrorMessage = (errorMsg) => {
    if (errorMsg?.includes('Contract not found')) {
      return {
        type: 'Contract Not Found',
        description: 'The account address in the current profile is not valid or does not exist on the blockchain.',
        suggestion: 'Check if the account address is correct and exists on the selected network.'
      };
    } else if (errorMsg?.includes('RPC')) {
      return {
        type: 'RPC Connection Error',
        description: 'Cannot connect to the blockchain RPC endpoint.',
        suggestion: 'Check if the RPC URL is correct and accessible.'
      };
    } else if (errorMsg?.includes('401') || errorMsg?.includes('Unauthorized')) {
      return {
        type: 'Authentication Error',
        description: 'Invalid API credentials or unauthorized access.',
        suggestion: 'Check if the API token is valid and has proper permissions.'
      };
    } else {
      return {
        type: 'Unknown Error',
        description: 'An unexpected error occurred.',
        suggestion: 'Please check the connection settings and try again.'
      };
    }
  };

  const errorInfo = parseErrorMessage(error);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Profile Configuration Error</span>
          </DialogTitle>
          <DialogDescription>
            The current profile has configuration issues that prevent normal operation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Error Details */}
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-red-700 dark:text-red-400">
                      {errorInfo.type}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {errorInfo.description}
                    </p>
                    <div className="text-xs bg-red-50 dark:bg-red-950 p-2 rounded font-mono break-all">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Profile Info */}
          <Card>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Current Profile</span>
                  <Badge variant="destructive" className="text-xs">
                    Error
                  </Badge>
                </h3>
                {currentProfile && (
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <span className="ml-2 font-medium">{currentProfile.name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">RPC URL:</span>
                      <span className="ml-2 font-mono text-xs break-all">{currentProfile.config.rpcUrl}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Account:</span>
                      <span className="ml-2 font-mono text-xs break-all">{currentProfile.config.accountAddress}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Fallback Profile Info */}
          {fallbackProfile && (
            <Card className="border-green-200 dark:border-green-800">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Fallback Profile Available</span>
                    <Badge variant="secondary" className="text-xs">
                      {fallbackProfile.name}
                    </Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {errorInfo.suggestion}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleRetry}
              disabled={isRetrying}
              variant="outline"
              className="flex-1"
            >
              {isRetrying ? 'Retrying...' : 'Retry Current Profile'}
            </Button>
            
            {fallbackProfile && (
              <Button
                onClick={handleSwitchToFallback}
                disabled={isSwitching}
                className="flex-1"
              >
                {isSwitching ? 'Switching...' : `Switch to ${fallbackProfile.name}`}
              </Button>
            )}
            
            <Button
              onClick={onOpenSettings}
              variant="secondary"
              className="flex-1"
            >
              <Settings className="h-4 w-4 mr-2" />
              Open Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}