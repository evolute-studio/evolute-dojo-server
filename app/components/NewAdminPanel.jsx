'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ContractActionsNew from './ContractActionsNew';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Server, User, Activity } from 'lucide-react';

export default function NewAdminPanel() {
  const [selectedContract, setSelectedContract] = useState('game');
  const [isLoading, setIsLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [serverHealth, setServerHealth] = useState(null);
  const [lastTransaction, setLastTransaction] = useState(null);

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
          'X-API-Key': process.env.NEXT_PUBLIC_API_SECRET_KEY || 'my-secure-api-key-123'
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

  // Execute action based on contract type
  const executeAction = async (actionType, formData, isGameAction) => {
    setIsLoading(true);
    
    try {
      let endpoint = '';
      let body = {};

      // Determine endpoint and body based on action type
      if (actionType === 'create_game') {
        endpoint = '/api/admin/game/create';
        body = {};
      } else if (actionType === 'join_game') {
        endpoint = '/api/admin/game/join';
        body = { hostPlayer: formData.hostPlayer };
      } else if (actionType === 'server_health') {
        await fetchHealth();
        return;
      } else if (actionType === 'refresh_data') {
        await Promise.all([fetchHealth(), fetchAccountInfo()]);
        return;
      } else if (isGameAction) {
        endpoint = '/api/admin/game/actions';
        body = { action: actionType, ...formData };
      } else {
        endpoint = '/api/admin/player';
        body = { action: actionType, ...formData };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_SECRET_KEY || 'my-secure-api-key-123'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.success) {
        setLastTransaction(data.data || data);
        // Refresh account info after successful transaction
        setTimeout(() => fetchAccountInfo(), 2000);
        return data.data || data;
      } else {
        throw new Error(data.error || `Failed to ${actionType}`);
      }
    } catch (error) {
      console.error(`Failed to ${actionType}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchAccountInfo();
  }, []);

  return (
    <div className="h-screen bg-background">
      {/* Fixed Sidebar */}
      <Sidebar 
        selectedContract={selectedContract}
        onContractSelect={setSelectedContract}
      />

      {/* Main Content Area with left margin for fixed sidebar */}
      <div className="flex flex-col h-screen" style={{ marginLeft: '294px' }}>
        {/* Top Status Bar */}
        <div className="border-b bg-card/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold">Mage Duel Admin Panel</h2>
              <Badge variant="outline">Development</Badge>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Server Status */}
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {serverHealth?.success ? (
                    <Badge variant="default" className="bg-green-500">Healthy</Badge>
                  ) : (
                    <Badge variant="destructive">Unknown</Badge>
                  )}
                </span>
              </div>

              {/* Account Status */}
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {accountInfo ? (
                    <Badge variant="outline">Nonce: {accountInfo.nonce}</Badge>
                  ) : (
                    <Badge variant="secondary">Loading...</Badge>
                  )}
                </span>
              </div>

              {/* Last Transaction */}
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {lastTransaction ? (
                    <Badge variant="default">
                      {lastTransaction.transactionHash ? 
                        `TX: ${lastTransaction.transactionHash.slice(0, 8)}...` :
                        'Success'
                      }
                    </Badge>
                  ) : (
                    <Badge variant="secondary">No transactions</Badge>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Actions Content */}
        <ContractActionsNew
          selectedContract={selectedContract}
          onActionExecute={executeAction}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}