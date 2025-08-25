'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Gamepad2, Server, User, Activity, Play, Loader2, Settings } from 'lucide-react';
import ActionModal from './ActionModal';

export default function AdminPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [serverHealth, setServerHealth] = useState(null);
  const [lastTransaction, setLastTransaction] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    actionType: '',
    actionName: '',
    isGameAction: true
  });

  // Fetch server health
  const fetchHealth = async () => {
    try {
      const response = await fetch('/api/admin/health');
      const data = await response.json();
      setServerHealth(data);
    } catch (error) {
      console.error('Failed to fetch health:', error);
    }
  };

  // Fetch account info
  const fetchAccountInfo = async () => {
    try {
      const response = await fetch('/api/admin/account', {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_SECRET_KEY || 'your-secret-api-key-here'
        }
      });
      const data = await response.json();
      if (data.success) {
        setAccountInfo(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch account info:', error);
    }
  };

  // Create game
  const createGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/game/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_SECRET_KEY || 'your-secret-api-key-here'
        },
        body: JSON.stringify({})
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLastTransaction(data.data);
        // Refresh account info after transaction
        setTimeout(() => fetchAccountInfo(), 2000);
      } else {
        alert('Failed to create game: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to create game:', error);
      alert('Failed to create game: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Join game
  const joinGame = async (hostPlayer) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/game/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_SECRET_KEY || 'your-secret-api-key-here'
        },
        body: JSON.stringify({ hostPlayer })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLastTransaction(data.data);
        setTimeout(() => fetchAccountInfo(), 2000);
      } else {
        alert('Failed to join game: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to join game:', error);
      alert('Failed to join game: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Execute game action
  const executeGameAction = async (action, params = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_SECRET_KEY || 'your-secret-api-key-here'
        },
        body: JSON.stringify({ action, contract: 'game', ...params })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLastTransaction(data.data);
        setTimeout(() => fetchAccountInfo(), 2000);
      } else {
        alert(`Failed to ${action}: ` + data.error);
      }
    } catch (error) {
      console.error(`Failed to ${action}:`, error);
      alert(`Failed to ${action}: ` + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Execute player action
  const executePlayerAction = async (action, params = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_SECRET_KEY || 'your-secret-api-key-here'
        },
        body: JSON.stringify({ action, contract: 'player', ...params })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLastTransaction(data.data);
        setTimeout(() => fetchAccountInfo(), 2000);
      } else {
        alert(`Failed to ${action}: ` + data.error);
      }
    } catch (error) {
      console.error(`Failed to ${action}:`, error);
      alert(`Failed to ${action}: ` + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Open modal for action
  const openModal = (actionType, actionName, isGameAction = true) => {
    setModalState({
      isOpen: true,
      actionType,
      actionName,
      isGameAction
    });
  };

  // Close modal
  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  // Handle modal submit
  const handleModalSubmit = async (formData) => {
    if (modalState.isGameAction) {
      await executeGameAction(modalState.actionType, formData);
    } else {
      await executePlayerAction(modalState.actionType, formData);
    }
    closeModal();
  };

  useEffect(() => {
    fetchHealth();
    fetchAccountInfo();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Gamepad2 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Evolute Dojo Admin Panel</h1>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Server Health */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serverHealth?.success ? 'Healthy' : 'Unknown'}
            </div>
            <p className="text-xs text-muted-foreground">
              Dojo: {serverHealth?.data?.dojoInitialized ? 'Ready' : 'Not Ready'}
            </p>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Account</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accountInfo ? `Nonce: ${accountInfo.nonce}` : 'Loading...'}
            </div>
            <p className="text-xs text-muted-foreground">
              {accountInfo?.address ? `${accountInfo.address.slice(0, 8)}...` : 'No address'}
            </p>
          </CardContent>
        </Card>

        {/* Last Transaction */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Transaction</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastTransaction ? 'Success' : 'None'}
            </div>
            <p className="text-xs text-muted-foreground">
              {lastTransaction?.transactionHash ? 
                `${lastTransaction.transactionHash.slice(0, 8)}...` : 
                'No recent transactions'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Game Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Game Actions</CardTitle>
            <CardDescription>
              Execute game-related transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={createGame} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              Create Game
            </Button>
            
            <Button 
              onClick={() => openModal('join_game', 'Join Game')}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              Join Game
            </Button>
            
            <Button 
              onClick={() => executeGameAction('cancel_game')}
              disabled={isLoading}
              variant="destructive"
              className="w-full"
            >
              Cancel Game
            </Button>

            <Button 
              onClick={() => executeGameAction('skip_move')}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              Skip Move
            </Button>

            <Button 
              onClick={() => openModal('make_move', 'Make Move')}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              Make Move
            </Button>

            <Button 
              onClick={() => openModal('commit_tiles', 'Commit Tiles')}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              Commit Tiles
            </Button>

            <Button 
              onClick={() => openModal('reveal_tile', 'Reveal Tile')}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              Reveal Tile
            </Button>

            <Button 
              onClick={() => openModal('request_next_tile', 'Request Next Tile')}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              Request Next Tile
            </Button>

            <Button 
              onClick={() => openModal('finish_game', 'Finish Game')}
              disabled={isLoading}
              variant="secondary"
              className="w-full"
            >
              Finish Game
            </Button>
          </CardContent>
        </Card>

        {/* Player Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Player Actions</CardTitle>
            <CardDescription>
              Manage player profiles and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => openModal('set_player', 'Set Player Profile', false)}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              <Settings className="mr-2 h-4 w-4" />
              Set Player Profile
            </Button>

            <Button 
              onClick={() => openModal('change_username', 'Change Username', false)}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              Change Username
            </Button>
            
            <Button 
              onClick={() => openModal('change_skin', 'Change Skin', false)}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              Change Skin
            </Button>
            
            <Button 
              onClick={() => executePlayerAction('become_bot')}
              disabled={isLoading}
              variant="secondary"
              className="w-full"
            >
              Become Bot
            </Button>

            <Button 
              onClick={() => executePlayerAction('become_controller')}
              disabled={isLoading}
              variant="secondary"
              className="w-full"
            >
              Become Controller
            </Button>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Current system status and configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">World Address:</span>
              <span className="text-sm font-mono">
                {accountInfo?.worldAddress ? 
                  `${accountInfo.worldAddress.slice(0, 8)}...` : 
                  'Loading...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">RPC URL:</span>
              <span className="text-sm">
                {accountInfo?.rpcUrl ? 'Connected' : 'Not connected'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Environment:</span>
              <span className="text-sm">{process.env.NODE_ENV || 'development'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => {
            fetchHealth();
            fetchAccountInfo();
          }}
          variant="outline"
        >
          Refresh Data
        </Button>
      </div>

      {/* Action Modal */}
      <ActionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        actionType={modalState.actionType}
        actionName={modalState.actionName}
        isLoading={isLoading}
      />
    </div>
  );
}