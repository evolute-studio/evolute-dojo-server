'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, X, Activity, Filter } from 'lucide-react';

const ROLES = [
  { value: '0', label: 'Guest' },
  { value: '1', label: 'Controller' },
  { value: '2', label: 'Bot' }
];

export default function PlayerFilters({ filters, onFiltersChange, onRefresh, isLoading, playersCount }) {
  const [localFilters, setLocalFilters] = useState({
    username: filters.username || '',
    playerId: filters.playerId || '',
    roles: filters.roles || []
  });

  // Apply filters instantly when localFilters change
  useEffect(() => {
    onFiltersChange(localFilters);
  }, [localFilters, onFiltersChange]);

  const clearFilters = () => {
    const clearedFilters = {
      username: '',
      playerId: '',
      roles: []
    };
    setLocalFilters(clearedFilters);
  };

  const handleInputChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoleToggle = (roleValue, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      roles: checked 
        ? [...prev.roles, roleValue]
        : prev.roles.filter(role => role !== roleValue)
    }));
  };

  const hasActiveFilters = localFilters.username || localFilters.playerId || localFilters.roles.length > 0;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Player Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                {playersCount} results
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Activity className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Activity className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                type="text"
                placeholder="Search by username..."
                value={localFilters.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Player ID</label>
              <Input
                type="text"
                placeholder="Search by player ID..."
                value={localFilters.playerId}
                onChange={(e) => handleInputChange('playerId', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Roles</label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((role) => {
                  const isSelected = localFilters.roles.includes(role.value);
                  return (
                    <Button
                      key={role.value}
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handleRoleToggle(role.value, !isSelected)}
                      className="text-xs"
                    >
                      {role.label}
                      {isSelected && <X className="h-3 w-3 ml-1" />}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {localFilters.username && (
                <Badge variant="secondary">
                  Username: {localFilters.username}
                  <button
                    onClick={() => handleInputChange('username', '')}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {localFilters.playerId && (
                <Badge variant="secondary">
                  Player ID: {localFilters.playerId.slice(0, 8)}...
                  <button
                    onClick={() => handleInputChange('playerId', '')}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {localFilters.roles.length > 0 && (
                localFilters.roles.map(role => (
                  <Badge key={role} variant="secondary">
                    Role: {ROLES.find(r => r.value === role)?.label}
                    <button
                      onClick={() => handleRoleToggle(role, false)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}