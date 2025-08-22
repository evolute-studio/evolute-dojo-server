'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2, User, Send, CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';

const ROLES = [
  { value: '0', label: 'Guest' },
  { value: '1', label: 'Controller' },
  { value: '2', label: 'Bot' }
];

export default function PlayerEditModal({ isOpen, onClose, player, onActionExecute }) {
  const [formData, setFormData] = useState({
    player_id: '',
    username: '',
    balance: '',
    games_played: '',
    active_skin: '',
    role: '0'
  });
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (player && isOpen) {
      // Convert username back to hex for form
      const usernameHex = stringToHex(player.username);
      setFormData({
        player_id: player.playerIdFull || '',
        username: usernameHex,
        balance: player.balanceRaw?.toString() || '0',
        games_played: player.gamesPlayedRaw?.toString() || '0',
        active_skin: player.activeSkin?.toString() || '0',
        role: player.roleRaw?.toString() || '0'
      });
      setTransactionStatus(null);
    }
  }, [player, isOpen]);

  const stringToHex = (str) => {
    if (!str || str === 'Unknown') return '0x0';
    let hex = '0x';
    for (let i = 0; i < str.length; i++) {
      hex += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hex;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onActionExecute) return;

    setIsLoading(true);
    setTransactionStatus({ status: 'pending', message: 'Submitting transaction...' });

    try {
      // Map form data to match expected parameter names from error message
      const actionParams = {
        playerId: formData.player_id,
        username: formData.username,
        balance: parseInt(formData.balance) || 0,
        gamesPlayed: parseInt(formData.games_played) || 0,
        activeSkin: parseInt(formData.active_skin) || 0,
        role: formData.role
      };
      
      const result = await onActionExecute('set_player', actionParams, false); // false for non-game action
      
      setTransactionStatus({ 
        status: 'success', 
        message: 'Player updated successfully',
        txHash: result?.transactionHash 
      });
    } catch (error) {
      setTransactionStatus({ 
        status: 'error', 
        message: `Transaction failed: ${error.message}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openTransactionExplorer = (txHash) => {
    const rpcUrl = process.env.NEXT_PUBLIC_DOJO_RPC_URL || 'https://api.cartridge.gg/x/dev-evolute-duel/katana';
    const explorerUrl = `${rpcUrl}/explorer/tx/${txHash}`;
    window.open(explorerUrl, '_blank');
  };

  const getStatusIcon = () => {
    switch (transactionStatus?.status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (transactionStatus?.status) {
      case 'pending':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-950';
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-950';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-950';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Edit Player</span>
          </DialogTitle>
          <DialogDescription>
            Update player information and send transaction to blockchain
            {player && <span className="block font-mono text-xs mt-1">Player: {player.username}</span>}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Player Info Card */}
          {player && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current Player Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground">Username:</span>
                    <span className="ml-2 font-semibold">{player.username}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Role:</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {player.roleText}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Balance:</span>
                    <span className="ml-2 font-mono">{player.balance}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Games:</span>
                    <span className="ml-2 font-mono">{player.gamesPlayed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Player Fields</CardTitle>
              <DialogDescription>
                Modify the player information below and submit the transaction
              </DialogDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="player_id">
                    Player ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="player_id"
                    type="text"
                    placeholder="Player ID (felt252)"
                    value={formData.player_id}
                    onChange={(e) => handleInputChange('player_id', e.target.value)}
                    required
                    className="font-mono text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username (will be converted to hex)"
                    value={formData.username.startsWith('0x') ? 
                      // Show decoded version if it's hex
                      (() => {
                        try {
                          let hex = formData.username.slice(2);
                          let result = '';
                          for (let i = 0; i < hex.length; i += 2) {
                            const byte = parseInt(hex.substr(i, 2), 16);
                            if (byte !== 0) result += String.fromCharCode(byte);
                          }
                          return result;
                        } catch { return formData.username; }
                      })() : 
                      formData.username
                    }
                    onChange={(e) => handleInputChange('username', stringToHex(e.target.value))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="balance">
                    Balance <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="balance"
                    type="number"
                    placeholder="Balance"
                    value={formData.balance}
                    onChange={(e) => handleInputChange('balance', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="games_played">
                    Games Played <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="games_played"
                    type="number"
                    placeholder="Games played count"
                    value={formData.games_played}
                    onChange={(e) => handleInputChange('games_played', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="active_skin">
                    Active Skin <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="active_skin"
                    type="number"
                    placeholder="Active skin ID"
                    value={formData.active_skin}
                    onChange={(e) => handleInputChange('active_skin', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange('role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Send Transaction
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Transaction Status Panel */}
          {transactionStatus && (
            <Card className={`border-2 ${getStatusColor()}`}>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon()}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{transactionStatus.message}</p>
                    {transactionStatus.txHash && (
                      <p className="text-xs text-muted-foreground font-mono">
                        TX: {transactionStatus.txHash}
                      </p>
                    )}
                  </div>
                  {transactionStatus.status === 'success' && transactionStatus.txHash ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openTransactionExplorer(transactionStatus.txHash)}
                      className="flex items-center space-x-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Explore</span>
                    </Button>
                  ) : (
                    <Badge variant={transactionStatus.status === 'error' ? 'destructive' : 'secondary'}>
                      {transactionStatus.status}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}