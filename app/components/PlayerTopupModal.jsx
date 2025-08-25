'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './TokenAuthProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  RefreshCw, 
  Send, 
  Wallet,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy
} from 'lucide-react';

export default function PlayerTopupModal({ isOpen, onClose, player, onActionExecute }) {
  const { token } = useAuth();
  const [balance, setBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [topupAmount, setTopupAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
  const [error, setError] = useState(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen && player) {
      setTopupAmount('');
      setTransactionResult(null);
      setError(null);
      loadBalance();
    }
  }, [isOpen, player]);

  const loadBalance = async () => {
    if (!player || !token) return;

    setIsLoadingBalance(true);
    setError(null);
    try {
      // Call balance_of directly via transaction API with evlt_token contract
      const response = await fetch('/api/admin/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': token
        },
        body: JSON.stringify({
          action: 'balance_of',
          contract: 'evlt_token',
          account: player.playerIdFull
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch balance');
      }

      setBalance(data.data.result);
    } catch (err) {
      console.error('Failed to load balance:', err);
      setError(err.message);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const handleTopup = async () => {
    if (!topupAmount || !player) return;

    setIsProcessing(true);
    setTransactionResult(null);
    setError(null);

    try {
      // Call mint_evlt directly via transaction API with evlt_topup contract
      const response = await fetch('/api/admin/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': token
        },
        body: JSON.stringify({
          action: 'mint_evlt',
          contract: 'evlt_topup',
          user: player.playerIdFull,
          amount: topupAmount,
          source: 1 // Admin topup source
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to mint EVLT tokens');
      }
      
      setTransactionResult({
        success: true,
        data: data.data,
        message: `Successfully topped up ${topupAmount} EVLT tokens to ${player.username}`
      });
      
      // Refresh balance after successful topup
      setTimeout(() => loadBalance(), 2000);
      
    } catch (err) {
      console.error('Topup failed:', err);
      setTransactionResult({
        success: false,
        error: err.message,
        message: `Failed to topup tokens: ${err.message}`
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatBalance = (queryResult) => {
    if (!queryResult) return '0';
    
    console.log('Balance Query Result Debug:', queryResult);
    
    // Direct primitive values
    if (typeof queryResult === 'string' || typeof queryResult === 'number') {
      return queryResult.toString();
    }
    
    // API response structure check - direct result field
    if (queryResult?.result !== undefined) {
      const result = queryResult.result;
      // Handle different result formats
      if (Array.isArray(result) && result.length > 0) {
        // Convert hex to decimal if needed
        const value = result[0];
        if (typeof value === 'string' && value.startsWith('0x')) {
          try {
            return parseInt(value, 16).toString();
          } catch (e) {
            return value;
          }
        }
        return value.toString();
      }
      // Direct string/number result
      if (typeof result === 'string' || typeof result === 'number') {
        return result.toString();
      }
      return result.toString();
    }
    
    // API response structure check - nested in data
    if (queryResult?.data?.result) {
      const result = queryResult.data.result;
      // Dojo call results are often arrays
      if (Array.isArray(result) && result.length > 0) {
        // Convert hex to decimal if needed
        const value = result[0];
        if (typeof value === 'string' && value.startsWith('0x')) {
          try {
            return parseInt(value, 16).toString();
          } catch (e) {
            return value;
          }
        }
        return value.toString();
      }
      return result.toString();
    }
    
    // Common Dojo response patterns
    if (queryResult?.data) {
      // Case 1: {data: [balance_value]}
      if (Array.isArray(queryResult.data) && queryResult.data.length > 0) {
        return queryResult.data[0].toString();
      }
      // Case 2: {data: {balance: value}} or {data: balance_value}
      if (typeof queryResult.data === 'object') {
        if (queryResult.data.balance !== undefined) {
          return queryResult.data.balance.toString();
        }
        // Try to get first value from object
        const values = Object.values(queryResult.data);
        if (values.length > 0) {
          return values[0].toString();
        }
      }
      // Case 3: direct value in data
      return queryResult.data.toString();
    }
    
    // Case 4: Array response [balance_value]
    if (Array.isArray(queryResult) && queryResult.length > 0) {
      return queryResult[0].toString();
    }
    
    // Case 5: Object with balance property
    if (queryResult?.balance !== undefined) {
      return queryResult.balance.toString();
    }
    
    // Case 6: Hex string values (common in Starknet)
    if (typeof queryResult === 'object' && queryResult) {
      const keys = Object.keys(queryResult);
      if (keys.length === 1) {
        const value = queryResult[keys[0]];
        if (typeof value === 'string' && value.startsWith('0x')) {
          // Convert hex to decimal
          try {
            return parseInt(value, 16).toString();
          } catch (e) {
            return value;
          }
        }
        return value.toString();
      }
    }
    
    return '0';
  };

  const handleClose = () => {
    setTransactionResult(null);
    setError(null);
    setTopupAmount('');
    onClose();
  };

  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Topup Player Balance</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Player Info */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{player.username}</CardTitle>
                  <CardDescription>Player Balance Management</CardDescription>
                </div>
                <Badge variant="outline">{player.roleText}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Player Address</Label>
                <button
                  onClick={() => copyToClipboard(player.playerIdFull)}
                  className="w-full p-2 bg-muted rounded font-mono text-xs break-all text-left hover:bg-muted/80 transition-colors flex items-center justify-between group"
                >
                  <span>{player.playerIdFull}</span>
                  <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Current Balance */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Current Balance</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadBalance}
                  disabled={isLoadingBalance}
                >
                  {isLoadingBalance ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 dark:bg-red-950 p-3 rounded-lg mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="text-center py-4">
                {isLoadingBalance ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading balance...</span>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl font-bold">
                      {formatBalance(balance)} <span className="text-lg font-normal text-muted-foreground">EVLT</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Current token balance</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Topup Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add Tokens</CardTitle>
              <CardDescription>Enter the amount of EVLT tokens to add to player's balance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (EVLT)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount to topup"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
              
              <Button
                onClick={handleTopup}
                disabled={!topupAmount || isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Topup...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Tokens
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Transaction Result */}
          {transactionResult && (
            <Card className={transactionResult.success ? 'border-green-200 bg-green-50 dark:bg-green-950' : 'border-red-200 bg-red-50 dark:bg-red-950'}>
              <CardContent className="pt-4">
                <div className="flex items-start space-x-3">
                  {transactionResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-2">
                    <h4 className={`font-semibold ${transactionResult.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                      {transactionResult.success ? 'Transaction Successful' : 'Transaction Failed'}
                    </h4>
                    <p className={`text-sm ${transactionResult.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                      {transactionResult.message}
                    </p>
                    
                    {transactionResult.success && transactionResult.data && (
                      <div className="mt-3 p-3 bg-white dark:bg-muted rounded border">
                        <div className="text-xs font-mono space-y-1">
                          {transactionResult.data.transactionHash && (
                            <div>
                              <span className="text-muted-foreground">TX Hash:</span>
                              <br />
                              <button
                                onClick={() => copyToClipboard(transactionResult.data.transactionHash)}
                                className="break-all hover:underline"
                              >
                                {transactionResult.data.transactionHash}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}