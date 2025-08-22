'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './TokenAuthProvider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Loader2, Grid, Trophy, RotateCcw, Dice1, Hash, Eye, EyeOff, Users, BarChart3 } from 'lucide-react';

export default function BoardDetailsModal({ isOpen, onClose, boardId }) {
  const { token } = useAuth();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && boardId && token) {
      fetchBoardDetails();
    }
  }, [isOpen, boardId, token]);

  const fetchBoardDetails = async () => {
    if (!boardId || !token) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/board/${boardId}`, {
        headers: {
          'X-API-Key': token
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch board details: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setBoard(data.data.board);
      } else {
        throw new Error(data.error || 'Failed to fetch board details');
      }
    } catch (err) {
      console.error('Error fetching board details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSideColor = (side) => {
    if (side === 'Blue') return 'text-blue-600';
    if (side === 'Red') return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getSideBadgeVariant = (side) => {
    if (side === 'Blue') return 'default';
    if (side === 'Red') return 'destructive';
    return 'outline';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Grid className="h-5 w-5" />
            <span>Board Details</span>
          </DialogTitle>
          <DialogDescription>
            Detailed view of board state and configuration
            {boardId && <span className="block font-mono text-xs mt-1">ID: {boardId}</span>}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading board details...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-600">
              <p className="font-medium">Failed to load board details</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {!loading && !error && board && (
            <>
              {/* Board Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4" />
                    <span>Game Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant={board.isGameOver ? 'destructive' : 'default'}>
                        {board.gameState}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Moves Done</p>
                      <p className="font-mono">{board.movesDone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Winner</p>
                      <p className={`font-mono text-xs ${board.winner ? getSideColor(board.winner) : ''}`}>
                        {board.winner || 'None'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Board ID</p>
                      <p className="font-mono text-xs">
                        {board.boardId || 'Not set'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Players */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Players</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">Player 1</h3>
                        {board.player1.side && (
                          <Badge variant={getSideBadgeVariant(board.player1.side)}>
                            {board.player1.side}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Address:</span>
                          <span className="ml-2 font-mono text-xs break-all">
                            {board.player1.address || 'Not set'}
                          </span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Jokers:</span>
                          <span className="ml-2 font-mono">{board.player1.jokers}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">Player 2</h3>
                        {board.player2.side && (
                          <Badge variant={getSideBadgeVariant(board.player2.side)}>
                            {board.player2.side}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Address:</span>
                          <span className="ml-2 font-mono text-xs break-all">
                            {board.player2.address || 'Not set'}
                          </span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Jokers:</span>
                          <span className="ml-2 font-mono">{board.player2.jokers}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scores */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Scores</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-blue-600">Blue Score</h3>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Current:</span>
                          <span className="ml-2 font-mono text-lg">{board.blueScore.current}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Total:</span>
                          <span className="ml-2 font-mono text-lg font-semibold">{board.blueScore.total}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-red-600">Red Score</h3>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Current:</span>
                          <span className="ml-2 font-mono text-lg">{board.redScore.current}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Total:</span>
                          <span className="ml-2 font-mono text-lg font-semibold">{board.redScore.total}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </>
          )}

          {!loading && !error && !board && (
            <div className="text-center py-8 text-muted-foreground">
              <EyeOff className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No board data available</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}