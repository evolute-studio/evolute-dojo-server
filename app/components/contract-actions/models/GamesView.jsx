'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../TokenAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import GameFilters from '../../GameFilters';
import BoardDetailsModal from '../../BoardDetailsModal';
import { 
  Gamepad2, 
  Filter, 
  Eye, 
  X, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';

export default function GamesView({ onActionExecute }) {
  const { token } = useAuth();
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(false);
  const [gamesError, setGamesError] = useState(null);
  const [filters, setFilters] = useState({
    player: '',
    status: 'all',
    gameMode: 'all',
    boardId: ''
  });
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  // Load games when component mounts and token is available
  useEffect(() => {
    if (token) {
      loadGames();
    }
  }, [token]);

  // Filter games when filters or games change
  useEffect(() => {
    applyFilters();
  }, [games, filters]);

  const loadGames = async () => {
    if (!token) {
      setGamesError('Authentication token not available');
      return;
    }

    setGamesLoading(true);
    setGamesError(null);
    try {
      const response = await fetch(`/api/admin/games?active=false`, {
        headers: {
          'X-API-Key': token
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch games: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setGames(data.data.games || []);
      } else {
        throw new Error(data.error || 'Failed to fetch games');
      }
    } catch (error) {
      console.error('Error loading games:', error);
      setGamesError(error.message);
    } finally {
      setGamesLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...games];

    // Filter by player address (search in all players)
    if (filters.player) {
      filtered = filtered.filter(game => {
        // Search in primary player for backward compatibility
        if (game.playerFull.toLowerCase().includes(filters.player.toLowerCase())) {
          return true;
        }
        // Search in all players if players array exists
        if (game.players && game.players.length > 0) {
          return game.players.some(player => 
            player.address.toLowerCase().includes(filters.player.toLowerCase())
          );
        }
        return false;
      });
    }

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(game => 
        game.statusRaw === filters.status
      );
    }

    // Filter by game mode
    if (filters.gameMode && filters.gameMode !== 'all') {
      filtered = filtered.filter(game => 
        game.gameModeRaw === filters.gameMode
      );
    }

    // Filter by board ID
    if (filters.boardId) {
      filtered = filtered.filter(game => 
        game.boardId && game.boardId.toString().toLowerCase().includes(filters.boardId.toLowerCase())
      );
    }

    setFilteredGames(filtered);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleShowBoardDetails = (boardId) => {
    setSelectedBoardId(boardId);
    setBoardModalOpen(true);
  };

  const handleCloseBoardModal = () => {
    setBoardModalOpen(false);
    setSelectedBoardId(null);
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Games Management</h1>
          <p className="text-muted-foreground">Query and manage game entities from blockchain</p>
        </div>
        
        {/* Game Filters */}
        <GameFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onRefresh={loadGames}
          isLoading={gamesLoading}
          gamesCount={filteredGames.length}
        />

        <Card>
          <CardHeader>
            <CardTitle>Games from Torii</CardTitle>
            <CardDescription>Live games data fetched from blockchain via Torii GraphQL</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gamesError && (
                <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span>{gamesError}</span>
                </div>
              )}

              {gamesLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Loading games from blockchain...</span>
                </div>
              )}

              {!gamesLoading && !gamesError && games.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Gamepad2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Games Found</h3>
                  <p className="text-sm">No games found in the blockchain. Create a new game to get started.</p>
                </div>
              )}

              {!gamesLoading && !gamesError && games.length > 0 && filteredGames.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Matching Games</h3>
                  <p className="text-sm">No games match your current filters. Try adjusting the filter criteria.</p>
                </div>
              )}

              {!gamesLoading && filteredGames.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Game</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Players</TableHead>
                      <TableHead>Board ID</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGames.map((game, index) => (
                      <TableRow key={game.id || index}>
                        <TableCell className="font-medium">
                          Game #{game.id + 1}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              game.status === 'In progress' ? 'default' : 
                              game.status === 'Waiting for player' ? 'secondary' :
                              game.status === 'Finished' ? 'outline' : 'destructive'
                            }
                          >
                            {game.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {game.gameMode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {game.players && game.players.length > 1 ? (
                              <div>
                                <Badge variant="secondary" className="text-xs mb-1">
                                  {game.playersCount} Players
                                </Badge>
                                {game.players.slice(0, 2).map((player, idx) => (
                                  <div key={idx} className="text-xs text-muted-foreground">
                                    {idx === 0 ? '🎮' : '👤'} {player.address.slice(0, 8)}...
                                  </div>
                                ))}
                                {game.players.length > 2 && (
                                  <div className="text-xs text-muted-foreground">+{game.players.length - 2} more</div>
                                )}
                              </div>
                            ) : (
                              <div className="text-xs text-muted-foreground font-mono">
                                {game.playerFull?.slice(0, 12)}...
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {game.boardId ? (
                            <span className="font-mono text-xs">{game.boardId}</span>
                          ) : (
                            <span className="text-muted-foreground text-xs">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleShowBoardDetails(game.boardId)}
                              disabled={!game.boardId}
                              title={!game.boardId ? 'No board ID available' : 'Show board details'}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            {(game.status === 'Waiting for player' || game.status === 'In progress') && (
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={async () => {
                                  if (confirm(`Cancel game ${game.id + 1}?`)) {
                                    try {
                                      // Use admin_cancel_game from matchmaking contract with player address
                                      const response = await fetch('/api/admin/transaction', {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'X-API-Key': token
                                        },
                                        body: JSON.stringify({
                                          action: 'admin_cancel_game',
                                          contract: 'matchmaking',
                                          player_address: game.playerFull
                                        })
                                      });

                                      const data = await response.json();
                                      if (!data.success) {
                                        throw new Error(data.error || 'Failed to cancel game');
                                      }
                                      
                                      await loadGames();
                                    } catch (error) {
                                      console.error('Failed to cancel game:', error);
                                      alert(`Failed to cancel game: ${error.message}`);
                                    }
                                  }
                                }}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              
              {!gamesLoading && games.length > 0 && (
                <div className="text-center py-4 text-muted-foreground border-t">
                  <p className="text-sm mb-2">
                    Showing {filteredGames.length} of {games.length} games
                    {filteredGames.length !== games.length && ' (filtered)'}
                  </p>
                  <p className="text-xs">Data refreshed from Torii GraphQL endpoint</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Board Details Modal */}
        <BoardDetailsModal
          isOpen={boardModalOpen}
          onClose={handleCloseBoardModal}
          boardId={selectedBoardId}
        />
      </div>
    </div>
  );
}