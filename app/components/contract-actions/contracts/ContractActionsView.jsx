'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { 
  Loader2, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  Search,
  MousePointer
} from 'lucide-react';
import { CONTRACT_ACTIONS, CONTRACT_INFO } from '../shared/contractActions';
import CallResultPanel from '../shared/CallResultPanel';

export default function ContractActionsView({ 
  selectedContract, 
  onActionExecute, 
  isLoading 
}) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [formData, setFormData] = useState({});
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  const actions = CONTRACT_ACTIONS[selectedContract] || [];
  const info = CONTRACT_INFO[selectedContract];

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setFormData({});
    setTransactionStatus(null);
    setQueryResult(null);
  };

  const handleInputChange = (paramName, value) => {
    setFormData(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAction) return;

    // Clear previous results
    setTransactionStatus(null);
    setQueryResult(null);

    if (selectedAction.isQuery) {
      // Handle read-only calls
      setTransactionStatus({ status: 'pending', message: 'Executing call...' });
      
      try {
        const isGameAction = selectedContract === 'game';
        const result = await onActionExecute(selectedAction.id, formData, isGameAction);
        
        setTransactionStatus({ 
          status: 'success', 
          message: 'Call executed successfully' 
        });
        setQueryResult(result);
      } catch (error) {
        setTransactionStatus({ 
          status: 'error', 
          message: `Call failed: ${error.message}` 
        });
      }
    } else {
      // Handle regular transactions
      setTransactionStatus({ status: 'pending', message: 'Submitting transaction...' });

      try {
        const isGameAction = selectedContract === 'game';
        const result = await onActionExecute(selectedAction.id, formData, isGameAction);
        
        setTransactionStatus({ 
          status: 'success', 
          message: 'Transaction completed successfully',
          txHash: result?.transactionHash 
        });
      } catch (error) {
        setTransactionStatus({ 
          status: 'error', 
          message: `Transaction failed: ${error.message}` 
        });
      }
    }
  };

  const renderFormField = (param) => {
    const { name, type, required, placeholder, options } = param;
    
    switch (type) {
      case 'select':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select onValueChange={(value) => handleInputChange(name, value)}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'textarea':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={name}
              placeholder={placeholder}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
      
      case 'number':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={name}
              type="number"
              placeholder={placeholder}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(name, parseInt(e.target.value) || '')}
              required={required}
            />
          </div>
        );
      
      default: // text
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={name}
              type="text"
              placeholder={placeholder}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
    }
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

  const openTransactionExplorer = (txHash) => {
    const rpcUrl = process.env.NEXT_PUBLIC_DOJO_RPC_URL || 'https://api.cartridge.gg/x/dev-evolute-duel/katana';
    const explorerUrl = `${rpcUrl}/explorer/tx/${txHash}`;
    window.open(explorerUrl, '_blank');
  };

  return (
    <div className="flex-1 flex justify-center">
      <div className="flex max-w-6xl w-full">
        {/* Left Sidebar - Actions List */}
        <div className="w-80 border-r bg-card/50 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{info?.title}</h2>
            <p className="text-sm text-muted-foreground">{info?.description}</p>
          </div>
          
          <div className="space-y-2">
            {actions.map((action) => {
              const Icon = action.icon;
              const isSelected = selectedAction?.id === action.id;
              
              return (
                <Button
                  key={action.id}
                  variant={isSelected ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                  onClick={() => handleActionSelect(action)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{action.name}</div>
                      <div className="text-xs opacity-75 truncate">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="flex-1 p-6">
          {selectedAction ? (
            <div className="max-w-2xl">
              <div className="mb-6">
                <h3 className="text-xl font-semibold">{selectedAction.name}</h3>
                <p className="text-muted-foreground">{selectedAction.description}</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Parameters</CardTitle>
                  <CardDescription>
                    {selectedAction.params.length === 0 
                      ? 'This action requires no parameters'
                      : 'Fill in the required parameters for this action'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {selectedAction.params.map(renderFormField)}
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : selectedAction.isQuery ? (
                          <Search className="mr-2 h-4 w-4" />
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        {selectedAction.isQuery ? 'Execute Call' : 'Send Transaction'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Transaction Status Panel */}
              {transactionStatus && (
                <Card className={`mt-4 border-2 ${getStatusColor()}`}>
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

              {/* Call Result Panel */}
              {queryResult && (
                <CallResultPanel 
                  queryResult={queryResult} 
                  selectedAction={selectedAction} 
                  formData={formData} 
                />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <MousePointer className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground">
                  Select an Action
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose an action from the left panel to configure parameters
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}