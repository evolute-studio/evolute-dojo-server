'use client';

import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from './TokenAuthProvider';
import { LogOut, User, Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function UserInfo() {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Card className="bg-card/50">
      <CardContent className="p-3">
        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium truncate">
                  Administrator
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Admin Panel Access
              </p>
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