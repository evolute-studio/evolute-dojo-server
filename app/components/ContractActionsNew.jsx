'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './TokenAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import ConnectionProfiles from './ConnectionProfiles';
import GameFilters from './GameFilters';
import PlayerFilters from './PlayerFilters';
import BoardDetailsModal from './BoardDetailsModal';
import PlayerEditModal from './PlayerEditModal';
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
  Clock,
  ExternalLink,
  Filter,
  Plus,
  Minus,
  Coins,
  Trophy,
  Shield,
  Zap,
  Target,
  Search
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
        { name: 'newUsername', type: 'text', required: true, placeholder: 'New username' }
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
  ],
  evlt_token: [
    {
      id: 'mint',
      name: 'Mint EVLT',
      description: 'Mint EVLT tokens to address',
      icon: Plus,
      params: [
        { name: 'recipient', type: 'text', required: true, placeholder: 'Recipient address' },
        { name: 'amount', type: 'number', required: true, placeholder: 'Amount to mint' }
      ]
    },
    {
      id: 'burn',
      name: 'Burn EVLT',
      description: 'Burn EVLT tokens from address',
      icon: X,
      params: [
        { name: 'from', type: 'text', required: true, placeholder: 'Address to burn from' },
        { name: 'amount', type: 'number', required: true, placeholder: 'Amount to burn' }
      ]
    },
    {
      id: 'transfer',
      name: 'Transfer EVLT',
      description: 'Transfer EVLT tokens',
      icon: Send,
      params: [
        { name: 'recipient', type: 'text', required: true, placeholder: 'Recipient address' },
        { name: 'amount', type: 'number', required: true, placeholder: 'Amount to transfer' }
      ]
    },
    {
      id: 'set_minter',
      name: 'Set Minter',
      description: 'Set minter address for EVLT',
      icon: Settings,
      params: [
        { name: 'minter_address', type: 'text', required: true, placeholder: 'Minter address' }
      ]
    },
    {
      id: 'balance_of',
      name: 'Check Balance',
      description: 'Get EVLT token balance for address',
      icon: Search,
      params: [
        { name: 'account', type: 'text', required: true, placeholder: 'Account address' }
      ],
      isQuery: true // Mark as read-only call
    }
  ],
  evlt_topup: [
    {
      id: 'mint_evlt',
      name: 'Mint EVLT',
      description: 'Mint EVLT tokens with source tracking',
      icon: Plus,
      params: [
        { name: 'user', type: 'text', required: true, placeholder: 'User address' },
        { name: 'amount', type: 'number', required: true, placeholder: 'Amount to mint' },
        { name: 'source', type: 'number', required: true, placeholder: 'Source ID' }
      ]
    },
    {
      id: 'mint_evlt_batch',
      name: 'Batch Mint EVLT',
      description: 'Mint EVLT to multiple users',
      icon: Users,
      params: [
        { name: 'users', type: 'textarea', required: true, placeholder: 'User addresses (JSON array)' },
        { name: 'amounts', type: 'textarea', required: true, placeholder: 'Amounts (JSON array)' },
        { name: 'source', type: 'number', required: true, placeholder: 'Source ID' }
      ]
    },
    {
      id: 'grant_minter_role',
      name: 'Grant Minter Role',
      description: 'Grant minter role to account',
      icon: Settings,
      params: [
        { name: 'account', type: 'text', required: true, placeholder: 'Account address' }
      ]
    }
  ],
  grnd_token: [
    {
      id: 'mint',
      name: 'Mint GRND',
      description: 'Mint GRND tokens to address',
      icon: Plus,
      params: [
        { name: 'recipient', type: 'text', required: true, placeholder: 'Recipient address' },
        { name: 'amount', type: 'number', required: true, placeholder: 'Amount to mint' }
      ]
    },
    {
      id: 'burn',
      name: 'Burn GRND',
      description: 'Burn GRND tokens from address',
      icon: X,
      params: [
        { name: 'from', type: 'text', required: true, placeholder: 'Address to burn from' },
        { name: 'amount', type: 'number', required: true, placeholder: 'Amount to burn' }
      ]
    },
    {
      id: 'reward_player',
      name: 'Reward Player',
      description: 'Reward player with GRND tokens',
      icon: CheckCircle,
      params: [
        { name: 'player_address', type: 'text', required: true, placeholder: 'Player address' },
        { name: 'amount', type: 'number', required: true, placeholder: 'Reward amount' }
      ]
    },
    {
      id: 'set_minter',
      name: 'Set Minter',
      description: 'Set minter address for GRND',
      icon: Settings,
      params: [
        { name: 'minter_address', type: 'text', required: true, placeholder: 'Minter address' }
      ]
    }
  ],
  matchmaking: [
    {
      id: 'create_game',
      name: 'Create Game',
      description: 'Create new matchmaking game',
      icon: Play,
      params: [
        { name: 'game_mode', type: 'number', required: true, placeholder: 'Game mode (0-2)' },
        { name: 'opponent', type: 'text', required: false, placeholder: 'Opponent address (optional)' }
      ]
    },
    {
      id: 'auto_match',
      name: 'Auto Match',
      description: 'Find automatic match',
      icon: Users,
      params: [
        { name: 'game_mode', type: 'number', required: true, placeholder: 'Game mode (0-2)' },
        { name: 'tournament_id', type: 'text', required: false, placeholder: 'Tournament ID (optional)' }
      ]
    },
    {
      id: 'join_game',
      name: 'Join Game',
      description: 'Join existing game',
      icon: ArrowRight,
      params: [
        { name: 'host_player', type: 'text', required: true, placeholder: 'Host player address' }
      ]
    },
    {
      id: 'cancel_game',
      name: 'Cancel Game',
      description: 'Cancel current game',
      icon: X,
      params: []
    },
    {
      id: 'admin_cancel_game',
      name: 'Admin Cancel Game',
      description: 'Admin cancel player game',
      icon: AlertCircle,
      params: [
        { name: 'player_address', type: 'text', required: true, placeholder: 'Player address' }
      ]
    }
  ],
  tournament_token: [
    {
      id: 'mint',
      name: 'Mint Tournament Pass',
      description: 'Mint tournament NFT pass',
      icon: Plus,
      params: [
        { name: 'player_name', type: 'text', required: true, placeholder: 'Player name' },
        { name: 'settings_id', type: 'number', required: true, placeholder: 'Settings ID' },
        { name: 'start', type: 'number', required: false, placeholder: 'Start time (optional)' },
        { name: 'end', type: 'number', required: false, placeholder: 'End time (optional)' },
        { name: 'to', type: 'text', required: true, placeholder: 'Recipient address' }
      ]
    },
    {
      id: 'enlist_duelist',
      name: 'Enlist Duelist',
      description: 'Enlist in tournament',
      icon: User,
      params: [
        { name: 'pass_id', type: 'number', required: true, placeholder: 'Tournament pass ID' }
      ]
    },
    {
      id: 'join_duel',
      name: 'Join Duel',
      description: 'Join tournament duel',
      icon: Gamepad2,
      params: [
        { name: 'pass_id', type: 'number', required: true, placeholder: 'Tournament pass ID' }
      ]
    },
    {
      id: 'start_tournament',
      name: 'Start Tournament',
      description: 'Start tournament',
      icon: Play,
      params: [
        { name: 'pass_id', type: 'number', required: true, placeholder: 'Tournament pass ID' }
      ]
    },
    {
      id: 'end_tournament',
      name: 'End Tournament',
      description: 'End tournament',
      icon: Flag,
      params: [
        { name: 'pass_id', type: 'number', required: true, placeholder: 'Tournament pass ID' }
      ]
    }
  ],
  settings: [
    {
      id: 'connection_profiles',
      name: 'Connection Profiles',
      description: 'Manage connection configurations',
      icon: Settings,
      params: []
    }
  ]
};

export default function ContractActionsNew({ 
  selectedContract, 
  onActionExecute,
  isLoading 
}) {
  const { token } = useAuth();
  const [selectedAction, setSelectedAction] = useState(null);
  const [formData, setFormData] = useState({});
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
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

  // Load games when games section is selected and token is available
  useEffect(() => {
    if (selectedContract === 'games' && token) {
      loadGames();
    }
  }, [selectedContract, token]);

  // Load players when players section is selected and token is available
  useEffect(() => {
    if (selectedContract === 'players' && token) {
      loadPlayers();
    }
  }, [selectedContract, token]);

  // Filter games when filters or games change
  useEffect(() => {
    applyFilters();
  }, [games, filters]);

  // Filter players when filters or players change
  useEffect(() => {
    applyPlayerFilters();
  }, [players, playerFilters]);

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

  const handleShowBoardDetails = (boardId) => {
    setSelectedBoardId(boardId);
    setBoardModalOpen(true);
  };

  const handleCloseBoardModal = () => {
    setBoardModalOpen(false);
    setSelectedBoardId(null);
  };

  const handleEditPlayer = (player) => {
    setSelectedPlayer(player);
    setPlayerEditModalOpen(true);
  };

  const handleClosePlayerEditModal = () => {
    setPlayerEditModalOpen(false);
    setSelectedPlayer(null);
  };

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

  const loadGames = async () => {
    if (!token) {
      setGamesError('Authentication token not available');
      return;
    }

    setGamesLoading(true);
    setGamesError(null);
    try {
      const response = await fetch(`/api/admin/games?active=false`, {  // Always load all games
        headers: {
          'X-API-Key': token  // Use the token from authentication context
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

  const openTransactionExplorer = (txHash) => {
    // Get RPC URL from environment or config
    const rpcUrl = process.env.NEXT_PUBLIC_DOJO_RPC_URL || 'https://api.cartridge.gg/x/dev-evolute-duel/katana';
    const explorerUrl = `${rpcUrl}/explorer/tx/${txHash}`;
    window.open(explorerUrl, '_blank');
  };

  const actions = CONTRACT_ACTIONS[selectedContract] || [];

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

  // Special handling for players model
  if (selectedContract === 'players') {
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

  // Special handling for games model
  if (selectedContract === 'games') {
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

                {!gamesLoading && filteredGames.length > 0 && filteredGames.map((game, index) => (
                  <div key={game.id || index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">Game #{game.id + 1}</h3>
                          <Badge 
                            variant={
                              game.status === 'In progress' ? 'default' : 
                              game.status === 'Waiting for player' ? 'secondary' :
                              game.status === 'Finished' ? 'outline' : 'destructive'
                            }
                          >
                            {game.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {game.gameMode}
                          </Badge>
                          {game.playersCount > 1 && (
                            <Badge variant="secondary" className="text-xs">
                              {game.playersCount} Players
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {game.players && game.players.length > 1 ? (
                            <div>
                              <p>Players ({game.playersCount}):</p>
                              {game.players.map((player, idx) => (
                                <p key={idx} className="ml-2">
                                  {idx === 0 ? '🎮 Host' : `👤 Player ${idx + 1}`}: 
                                  <span className="font-mono ml-1 text-xs break-all">{player.address}</span>
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p>Player: <span className="font-mono text-xs break-all">{game.playerFull}</span></p>
                          )}
                          {game.boardId && (
                            <p>Board ID: <span className="font-mono text-xs">{game.boardId}</span></p>
                          )}
                          <p>Mode: {game.gameMode}</p>
                        </div>
                      </div>
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
                                  await onActionExecute('cancel_game', {}, true);
                                  await loadGames(); // Refresh after cancel
                                } catch (error) {
                                  console.error('Failed to cancel game:', error);
                                }
                              }
                            }}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
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

  // Special handling for system and monitoring sections
  if (selectedContract === 'system') {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">System Information</h1>
            <p className="text-muted-foreground">System status and configuration details</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Server Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Environment:</span>
                    <span className="font-mono">Development</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="font-mono">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>RPC URL:</span>
                    <span className="text-green-600">Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>World Address:</span>
                    <span className="font-mono text-xs">0x023...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (selectedContract === 'monitoring') {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Monitoring & Analytics</h1>
            <p className="text-muted-foreground">System logs and performance metrics</p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Transaction executed</span>
                    <span className="text-sm text-muted-foreground">2 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Server health check</span>
                    <span className="text-sm text-muted-foreground">5 minutes ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-sm text-muted-foreground">Total Games</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">Transactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (selectedContract === 'analytics') {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Game and player analytics dashboard</p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Analytics</CardTitle>
                <CardDescription>Overview of game and player statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-sm">Total Games</h3>
                    </div>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">All time games played</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-sm">Active Players</h3>
                    </div>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">Registered players</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-sm">Games Today</h3>
                    </div>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">Games played today</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-sm">System Status</h3>
                    </div>
                    <div className="text-2xl font-bold text-green-600">Online</div>
                    <p className="text-xs text-muted-foreground">All systems operational</p>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-muted rounded-lg text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time analytics dashboard with detailed game statistics, player engagement metrics, 
                    and performance insights will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (selectedContract === 'settings') {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage connection profiles and system configuration</p>
          </div>
          
          <ConnectionProfiles />
        </div>
      </div>
    );
  }

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
    evlt_token: { title: 'EVLT Token', description: 'Manage EVLT token operations (mint, burn, transfer)' },
    evlt_topup: { title: 'EVLT Topup', description: 'Handle EVLT token topup and batch operations' },
    grnd_token: { title: 'GRND Token', description: 'Manage GRND token operations and player rewards' },
    matchmaking: { title: 'Matchmaking', description: 'Manage game matchmaking and tournament matching' },
    tournament_token: { title: 'Tournament Token', description: 'Manage tournament NFT passes and operations' },
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
                <Card className="mt-4 border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center space-x-2">
                      <Search className="h-4 w-4 text-blue-500" />
                      <span>Call Result</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedAction.id === 'balance_of' && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">EVLT Token Balance:</div>
                          <div className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                            {(() => {
                              // Extract balance from the result
                              console.log('Query Result Debug:', queryResult);
                              
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
                              
                              return `Unable to parse: ${typeof queryResult}`;
                            })()}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Address: {formData.account}
                          </div>
                        </div>
                      )}
                      
                      {/* Raw result for debugging */}
                      <details className="mt-4" open>
                        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                          Raw Response (Debug) - PLEASE EXPAND
                        </summary>
                        <div className="mt-2 space-y-2">
                          <div className="text-xs">
                            <strong>Type:</strong> {typeof queryResult}
                          </div>
                          <div className="text-xs">
                            <strong>Keys:</strong> {queryResult && typeof queryResult === 'object' ? Object.keys(queryResult).join(', ') : 'N/A'}
                          </div>
                          <pre className="p-3 bg-muted rounded text-xs overflow-auto max-h-64">
                            {JSON.stringify(queryResult, null, 2)}
                          </pre>
                        </div>
                      </details>
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