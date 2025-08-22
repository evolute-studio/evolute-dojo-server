'use client';

import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useFirebaseAuth } from './FirebaseAuthProvider';
import { LogOut, User, Shield, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function UserInfo() {
  const { user, logout, isAuthenticated } = useFirebaseAuth();

  if (!isAuthenticated || !user) return null;

  const formatLastSignIn = (timestamp) => {
    if (!timestamp) return 'Unknown';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-card/50">
      <CardContent className="p-3">
        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-3">
            {/* User Avatar */}
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName}
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium truncate" title={user.displayName || user.email}>
                  {user.displayName || user.email?.split('@')[0] || 'User'}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Mail className="h-2.5 w-2.5" />
                <span className="truncate" title={user.email}>
                  {user.email}
                </span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950"
            title="Sign Out"
          >
            <LogOut className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}