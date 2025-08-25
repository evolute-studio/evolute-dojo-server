'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../TokenAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import PlayerFilters from '../../PlayerFilters';
import PlayerEditModal from '../../PlayerEditModal';
import PlayerTopupModal from '../../PlayerTopupModal';
import { 
  Users, 
  Filter, 
  User, 
  Loader2, 
  AlertCircle,
  Activity,
  Copy,
  Check,
  MoreHorizontal,
  Wallet
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
  const [playerTopupModalOpen, setPlayerTopupModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(null);

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

  const handleTopupPlayer = (player) => {
    setSelectedPlayer(player);
    setPlayerTopupModalOpen(true);
  };

  const handleClosePlayerEditModal = () => {
    setPlayerEditModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleClosePlayerTopupModal = () => {
    setPlayerTopupModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleCopyAddress = async (address) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 2000);
      }
    } catch (error) {
      console.error('Failed to copy address:', error);
      // Try fallback method
      try {
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError);
      }
    }
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
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Player ID</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Games</TableHead>
                        <TableHead>Active Skin</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlayers.map((player, index) => (
                        <TableRow key={player.id || index}>
                          <TableCell className="font-medium">
                            {player.username}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {player.roleText}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => handleCopyAddress(player.playerIdFull)}
                              className="font-mono text-xs break-all text-left hover:bg-muted rounded px-2 py-1 transition-colors flex items-center space-x-2 group"
                              title="Click to copy full address"
                            >
                              <span>{player.playerIdFull?.slice(0, 16)}...</span>
                              {copiedAddress === player.playerIdFull ? (
                                <Check className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                            </button>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono">{player.balance}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono">{player.gamesPlayed}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono">{player.activeSkin}</span>
                          </TableCell>
                          <TableCell>
                            {player.tutorialCompleted && (
                              <Badge variant="secondary" className="text-xs">
                                Tutorial ✓
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditPlayer(player)}>
                                  <User className="h-4 w-4 mr-2" />
                                  Edit Player
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleTopupPlayer(player)}>
                                  <Wallet className="h-4 w-4 mr-2" />
                                  Topup Balance
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="text-center py-4 text-muted-foreground border-t mt-4">
                    <p className="text-sm mb-2">
                      Showing {filteredPlayers.length} of {players.length} players
                      {filteredPlayers.length !== players.length && ' (filtered)'}
                    </p>
                    <p className="text-xs">Data refreshed from Torii GraphQL endpoint</p>
                  </div>
                </>
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

        {/* Player Topup Modal */}
        <PlayerTopupModal
          isOpen={playerTopupModalOpen}
          onClose={handleClosePlayerTopupModal}
          player={selectedPlayer}
          onActionExecute={onActionExecute}
        />
      </div>
    </div>
  );
}