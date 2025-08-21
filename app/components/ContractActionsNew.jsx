'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Play, 
  Users, 
  X, 
  SkipForward, 
  MousePointer, 
  Grid, 
  Eye, 
  ArrowRight, 
  Flag,
  User,
  Settings,
  Gamepad2,
  Cpu,
  Joystick,
  Loader2,
  Activity,
  Server,
  BarChart3,
  Send,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

const CONTRACT_ACTIONS = {
  tutorial: [
    {
      id: 'create_tutorial_game',
      name: 'Create Tutorial Game',
      description: 'Start a new tutorial game session',
      icon: Play,
      params: []
    },
    {
      id: 'make_move',
      name: 'Make Move',
      description: 'Execute a move in tutorial',
      icon: MousePointer,
      params: [
        { name: 'jokerTile', type: 'number', required: false, placeholder: 'Joker tile (optional)' },
        { name: 'rotation', type: 'select', required: true, options: ['0', '1', '2', '3'] },
        { name: 'col', type: 'number', required: true, placeholder: 'Column' },
        { name: 'row', type: 'number', required: true, placeholder: 'Row' }
      ]
    },
    {
      id: 'skip_move',
      name: 'Skip Move',
      description: 'Skip current turn in tutorial',
      icon: SkipForward,
      params: []
    }
  ],
  account_migration: [
    {
      id: 'initiate_migration',
      name: 'Initiate Migration',
      description: 'Start account migration process',
      icon: ArrowRight,
      params: [
        { name: 'target_controller', type: 'text', required: true, placeholder: 'Target controller address' }
      ]
    },
    {
      id: 'confirm_migration',
      name: 'Confirm Migration',
      description: 'Confirm pending migration',
      icon: CheckCircle,
      params: [
        { name: 'guest_address', type: 'text', required: true, placeholder: 'Guest address' }
      ]
    },
    {
      id: 'cancel_migration',
      name: 'Cancel Migration',
      description: 'Cancel pending migration',
      icon: X,
      params: []
    },
    {
      id: 'execute_migration',
      name: 'Execute Migration',
      description: 'Execute confirmed migration',
      icon: Play,
      params: [
        { name: 'guest_address', type: 'text', required: true, placeholder: 'Guest address' }
      ]
    },
    {
      id: 'emergency_cancel_migration',
      name: 'Emergency Cancel',
      description: 'Emergency cancel migration',
      icon: AlertCircle,
      params: [
        { name: 'guest_address', type: 'text', required: true, placeholder: 'Guest address' }
      ]
    }
  ],
  game: [
    {
      id: 'create_game',
      name: 'Create Game',
      description: 'Start a new game session',
      icon: Play,
      params: []
    },
    {
      id: 'cancel_game',
      name: 'Cancel Game',
      description: 'Cancel current game',
      icon: X,
      params: []
    },
    {
      id: 'join_game', 
      name: 'Join Game',
      description: 'Join an existing game',
      icon: Users,
      params: [
        { name: 'host_player', type: 'text', required: true, placeholder: 'Host player address' }
      ]
    },
    {
      id: 'commit_tiles',
      name: 'Commit Tiles',
      description: 'Commit tile commitments',
      icon: Grid,
      params: [
        { name: 'commitments', type: 'textarea', required: true, placeholder: 'Array of commitments (JSON)' }
      ]
    },
    {
      id: 'reveal_tile',
      name: 'Reveal Tile',
      description: 'Reveal a committed tile',
      icon: Eye,
      params: [
        { name: 'tile_index', type: 'number', required: true, placeholder: 'Tile index (0-255)' },
        { name: 'nonce', type: 'text', required: true, placeholder: 'Nonce (felt252)' },
        { name: 'c', type: 'number', required: true, placeholder: 'Tile value (0-255)' }
      ]
    },
    {
      id: 'request_next_tile',
      name: 'Request Next Tile',
      description: 'Request next tile with reveal',
      icon: ArrowRight,
      params: [
        { name: 'tile_index', type: 'number', required: true, placeholder: 'Tile index (0-255)' },
        { name: 'nonce', type: 'text', required: true, placeholder: 'Nonce (felt252)' },
        { name: 'c', type: 'number', required: true, placeholder: 'Tile value (0-255)' }
      ]
    },
    {
      id: 'make_move',
      name: 'Make Move',
      description: 'Execute a game move',
      icon: MousePointer,
      params: [
        { name: 'joker_tile', type: 'number', required: false, placeholder: 'Joker tile (optional, 0-255)' },
        { name: 'rotation', type: 'select', required: true, options: ['0', '1', '2', '3'] },
        { name: 'col', type: 'number', required: true, placeholder: 'Column (0-255)' },
        { name: 'row', type: 'number', required: true, placeholder: 'Row (0-255)' }
      ]
    },
    {
      id: 'skip_move',
      name: 'Skip Move',
      description: 'Skip current turn',
      icon: SkipForward,
      params: []
    },
    {
      id: 'finish_game',
      name: 'Finish Game',
      description: 'Complete the current game',
      icon: Flag,
      params: [
        { name: 'board_id', type: 'text', required: true, placeholder: 'Board ID (felt252)' }
      ]
    }
  ],
  player: [
    {
      id: 'set_player',
      name: 'Set Player',
      description: 'Set complete player profile',
      icon: User,
      params: [
        { name: 'player_id', type: 'text', required: true, placeholder: 'Player ID (felt252)' },
        { name: 'username', type: 'text', required: true, placeholder: 'Username' },
        { name: 'balance', type: 'number', required: true, placeholder: 'Balance' },
        { name: 'games_played', type: 'number', required: true, placeholder: 'Games played count' },
        { name: 'active_skin', type: 'number', required: true, placeholder: 'Active skin ID' },
        { name: 'role', type: 'select', required: true, options: ['0', '1', '2'] }
      ]
    },
    {
      id: 'change_username',
      name: 'Change Username',
      description: 'Update player username',
      icon: Settings,
      params: [
        { name: 'username', type: 'text', required: true, placeholder: 'New username' }
      ]
    },
    {
      id: 'change_skin',
      name: 'Change Skin',
      description: 'Update player skin',
      icon: Gamepad2,
      params: [
        { name: 'skin_id', type: 'number', required: true, placeholder: 'Skin ID' }
      ]
    },
    {
      id: 'become_bot',
      name: 'Become Bot',
      description: 'Switch player to bot mode',
      icon: Cpu,
      params: []
    },
    {
      id: 'become_controller',
      name: 'Become Controller',
      description: 'Switch player to controller mode',
      icon: Joystick,
      params: []
    }
  ],
  system: [
    {
      id: 'server_health',
      name: 'Check Server Health',
      description: 'Verify server status',
      icon: Server,
      params: []
    },
    {
      id: 'refresh_data',
      name: 'Refresh Data',
      description: 'Reload all system data',
      icon: Activity,
      params: []
    }
  ],
  monitoring: [
    {
      id: 'view_logs',
      name: 'View Logs',
      description: 'Check system logs',
      icon: BarChart3,
      params: []
    },
    {
      id: 'performance_metrics',
      name: 'Performance Metrics',
      description: 'View performance data',
      icon: Activity,
      params: []
    }
  ]
};

export default function ContractActionsNew({ 
  selectedContract, 
  onActionExecute,
  isLoading 
}) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [formData, setFormData] = useState({});
  const [transactionStatus, setTransactionStatus] = useState(null);

  const actions = CONTRACT_ACTIONS[selectedContract] || [];

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setFormData({});
    setTransactionStatus(null);
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

  if (!selectedContract) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">
            Select a Contract
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose a contract from the sidebar to view available actions
          </p>
        </div>
      </div>
    );
  }

  const contractInfo = {
    tutorial: { title: 'Tutorial Contract', description: 'Manage tutorial system and player progression' },
    account_migration: { title: 'Account Migration', description: 'Handle account migration and data transfer' },
    game: { title: 'Game Contract', description: 'Execute game-related transactions and operations' },
    player: { title: 'Player Contract', description: 'Manage player profiles and settings' },
    system: { title: 'System Operations', description: 'Monitor and manage system health' },
    monitoring: { title: 'Monitoring & Analytics', description: 'View logs and performance metrics' }
  };

  const info = contractInfo[selectedContract];

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
                      <Badge variant={transactionStatus.status === 'success' ? 'default' : 
                                    transactionStatus.status === 'error' ? 'destructive' : 'secondary'}>
                        {transactionStatus.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
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