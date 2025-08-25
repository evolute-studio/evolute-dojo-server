'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../TokenAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import PlayerFilters from '../../PlayerFilters';
import PlayerEditModal from '../../PlayerEditModal';
import { 
  Users, 
  Filter, 
  User, 
  Loader2, 
  AlertCircle,
  Activity
} from 'lucide-react';

export default function PlayersView({ onActionExecute }) {
  const { token } = useAuth();
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [playersLoading, setPlayersLoading] = useState(false);
  const [playersError, setPlayersError] = useState(null);
  const [playerFilters, setPlayerFilters] = useState({
    username: '',
    playerId: '',
    roles: []
  });
  const [playerEditModalOpen, setPlayerEditModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Load players when component mounts and token is available
  useEffect(() => {
    if (token) {
      loadPlayers();
    }
  }, [token]);

  // Filter players when filters or players change
  useEffect(() => {
    applyPlayerFilters();
  }, [players, playerFilters]);

  const loadPlayers = async () => {
    if (!token) {
      setPlayersError('Authentication token not available');
      return;
    }

    setPlayersLoading(true);
    setPlayersError(null);
    try {
      const response = await fetch(`/api/admin/players`, {
        headers: {
          'X-API-Key': token
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch players: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setPlayers(data.data.players || []);
      } else {
        throw new Error(data.error || 'Failed to fetch players');
      }
    } catch (error) {
      console.error('Error loading players:', error);
      setPlayersError(error.message);
    } finally {
      setPlayersLoading(false);
    }
  };

  const applyPlayerFilters = () => {
    let filtered = [...players];

    // Filter by username
    if (playerFilters.username) {
      filtered = filtered.filter(player => 
        player.username.toLowerCase().includes(playerFilters.username.toLowerCase())
      );
    }

    // Filter by player ID
    if (playerFilters.playerId) {
      filtered = filtered.filter(player => 
        player.playerIdFull.toLowerCase().includes(playerFilters.playerId.toLowerCase())
      );
    }

    // Filter by roles (multiple selection)
    if (playerFilters.roles && playerFilters.roles.length > 0) {
      filtered = filtered.filter(player => 
        playerFilters.roles.includes(player.roleRaw.toString())
      );
    }

    setFilteredPlayers(filtered);
  };

  const handlePlayerFiltersChange = (newFilters) => {
    setPlayerFilters(newFilters);
  };

  const handleEditPlayer = (player) => {
    setSelectedPlayer(player);
    setPlayerEditModalOpen(true);
  };

  const handleClosePlayerEditModal = () => {
    setPlayerEditModalOpen(false);
    setSelectedPlayer(null);
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Players Management</h1>
          <p className="text-muted-foreground">Query and manage player entities from blockchain</p>
        </div>
        
        {/* Player Filters */}
        <PlayerFilters
          filters={playerFilters}
          onFiltersChange={handlePlayerFiltersChange}
          onRefresh={loadPlayers}
          isLoading={playersLoading}
          playersCount={filteredPlayers.length}
        />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Players from Torii</CardTitle>
                <CardDescription>Live player data fetched from blockchain via Torii GraphQL</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={loadPlayers}
                disabled={playersLoading}
              >
                {playersLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Activity className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {playersError && (
                <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span>{playersError}</span>
                </div>
              )}

              {playersLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Loading players from blockchain...</span>
                </div>
              )}

              {!playersLoading && !playersError && players.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Players Found</h3>
                  <p className="text-sm">No players found in the blockchain.</p>
                </div>
              )}

              {!playersLoading && players.length > 0 && filteredPlayers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Matching Players</h3>
                  <p className="text-sm">No players match your current filters. Try adjusting the filter criteria.</p>
                </div>
              )}

              {!playersLoading && filteredPlayers.length > 0 && (
                <div className="space-y-4">
                  {filteredPlayers.map((player, index) => (
                    <div key={player.id || index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{player.username}</h3>
                            <Badge variant="outline" className="text-xs">
                              {player.roleText}
                            </Badge>
                            {player.tutorialCompleted && (
                              <Badge variant="secondary" className="text-xs">
                                Tutorial ✓
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Player ID: <span className="font-mono text-xs break-all">{player.playerIdFull}</span></p>
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <span className="text-muted-foreground">Balance:</span>
                                <span className="ml-1 font-mono">{player.balance}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Games:</span>
                                <span className="ml-1 font-mono">{player.gamesPlayed}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Active Skin:</span>
                                <span className="ml-1 font-mono">{player.activeSkin}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditPlayer(player)}
                          >
                            <User className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center py-4 text-muted-foreground border-t">
                    <p className="text-sm mb-2">
                      Showing {filteredPlayers.length} of {players.length} players
                      {filteredPlayers.length !== players.length && ' (filtered)'}
                    </p>
                    <p className="text-xs">Data refreshed from Torii GraphQL endpoint</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Player Edit Modal */}
        <PlayerEditModal
          isOpen={playerEditModalOpen}
          onClose={handleClosePlayerEditModal}
          player={selectedPlayer}
          onActionExecute={onActionExecute}
        />
      </div>
    </div>
  );
}