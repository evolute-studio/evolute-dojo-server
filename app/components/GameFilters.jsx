'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, Filter, X, RefreshCw } from 'lucide-react';

// Game status and mode constants
const GAME_STATUSES = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Created', label: 'Waiting for player' },
  { value: 'InProgress', label: 'In progress' },
  { value: 'Finished', label: 'Finished' },
  { value: 'Canceled', label: 'Canceled' }
];

const GAME_MODES = [
  { value: 'all', label: 'All Modes' },
  { value: 'None', label: 'None' },
  { value: 'Tutorial', label: 'Tutorial' },
  { value: 'Ranked', label: 'Ranked' },
  { value: 'Casual', label: 'Casual' }
];

export default function GameFilters({ 
  filters, 
  onFiltersChange, 
  onRefresh,
  isLoading,
  gamesCount = 0 
}) {
  const [localFilters, setLocalFilters] = useState({
    player: '',
    status: 'all',
    gameMode: 'all',
    boardId: '',
    ...filters
  });

  // Update local state when props change
  useEffect(() => {
    setLocalFilters(prev => ({
      ...prev,
      ...filters
    }));
  }, [filters]);

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      [field]: value
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      player: '',
      status: 'all',
      gameMode: 'all',
      boardId: ''
    };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = () => {
    return localFilters.player || 
           (localFilters.status && localFilters.status !== 'all') ||
           (localFilters.gameMode && localFilters.gameMode !== 'all') ||
           localFilters.boardId;
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.player) count++;
    if (localFilters.status && localFilters.status !== 'all') count++;
    if (localFilters.gameMode && localFilters.gameMode !== 'all') count++;
    if (localFilters.boardId) count++;
    return count;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Game Filters</span>
              {hasActiveFilters() && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFiltersCount()} active
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Filter games by player, status, mode, and board ID
              {gamesCount > 0 && ` • ${gamesCount} games found`}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllFilters}
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Player Filter */}
          <div className="space-y-2">
            <Label htmlFor="player-filter">Player Address</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="player-filter"
                placeholder="0x123... or search"
                value={localFilters.player}
                onChange={(e) => handleFilterChange('player', e.target.value)}
                className="pl-8"
              />
            </div>
            {localFilters.player && (
              <Badge variant="outline" className="text-xs">
                Searching: {localFilters.player.slice(0, 10)}...
              </Badge>
            )}
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status-filter">Game Status</Label>
            <Select 
              value={localFilters.status} 
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {GAME_STATUSES.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {localFilters.status && localFilters.status !== 'all' && (
              <Badge variant="outline" className="text-xs">
                Status: {GAME_STATUSES.find(s => s.value === localFilters.status)?.label}
              </Badge>
            )}
          </div>

          {/* Game Mode Filter */}
          <div className="space-y-2">
            <Label htmlFor="mode-filter">Game Mode</Label>
            <Select 
              value={localFilters.gameMode} 
              onValueChange={(value) => handleFilterChange('gameMode', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Modes" />
              </SelectTrigger>
              <SelectContent>
                {GAME_MODES.map(mode => (
                  <SelectItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {localFilters.gameMode && localFilters.gameMode !== 'all' && (
              <Badge variant="outline" className="text-xs">
                Mode: {GAME_MODES.find(m => m.value === localFilters.gameMode)?.label}
              </Badge>
            )}
          </div>

          {/* Board ID Filter */}
          <div className="space-y-2">
            <Label htmlFor="board-filter">Board ID</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="board-filter"
                placeholder="Board ID search"
                value={localFilters.boardId}
                onChange={(e) => handleFilterChange('boardId', e.target.value)}
                className="pl-8"
              />
            </div>
            {localFilters.boardId && (
              <Badge variant="outline" className="text-xs">
                Board: {localFilters.boardId.slice(0, 8)}...
              </Badge>
            )}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters() && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
              {localFilters.player && (
                <Badge variant="secondary">
                  Player: {localFilters.player.slice(0, 8)}...
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('player', '')}
                  />
                </Badge>
              )}
              {localFilters.status && localFilters.status !== 'all' && (
                <Badge variant="secondary">
                  Status: {GAME_STATUSES.find(s => s.value === localFilters.status)?.label}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('status', 'all')}
                  />
                </Badge>
              )}
              {localFilters.gameMode && localFilters.gameMode !== 'all' && (
                <Badge variant="secondary">
                  Mode: {GAME_MODES.find(m => m.value === localFilters.gameMode)?.label}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('gameMode', 'all')}
                  />
                </Badge>
              )}
              {localFilters.boardId && (
                <Badge variant="secondary">
                  Board: {localFilters.boardId.slice(0, 8)}...
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('boardId', '')}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}