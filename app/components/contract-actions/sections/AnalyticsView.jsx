'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { BarChart3, Users, Activity, Server } from 'lucide-react';

export default function AnalyticsView() {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Game and player analytics dashboard</p>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Analytics</CardTitle>
              <CardDescription>Overview of game and player statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">Total Games</h3>
                  </div>
                  <div className="text-2xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground">All time games played</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">Active Players</h3>
                  </div>
                  <div className="text-2xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground">Registered players</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">Games Today</h3>
                  </div>
                  <div className="text-2xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground">Games played today</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">System Status</h3>
                  </div>
                  <div className="text-2xl font-bold text-green-600">Online</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-muted rounded-lg text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time analytics dashboard with detailed game statistics, player engagement metrics, 
                  and performance insights will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}