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
  Activity,
  Server,
  BarChart3,
  Send,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
  Coins,
  Trophy,
  Shield,
  Zap,
  Target,
  Search
} from 'lucide-react';

export const CONTRACT_ACTIONS = {
  // Tutorial Contract
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

  // Account Migration Contract
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

  // Game Contract
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

  // Player Contract
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

  // EVLT Token Contract
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
      isQuery: true
    }
  ],

  // EVLT Topup Contract
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

  // GRND Token Contract
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

  // Matchmaking Contract
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

  // Tournament Token Contract
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
  ]
};

export const CONTRACT_INFO = {
  tutorial: { title: 'Tutorial Contract', description: 'Manage tutorial system and player progression' },
  account_migration: { title: 'Account Migration', description: 'Handle account migration and data transfer' },
  game: { title: 'Game Contract', description: 'Execute game-related transactions and operations' },
  player: { title: 'Player Contract', description: 'Manage player profiles and settings' },
  evlt_token: { title: 'EVLT Token', description: 'Manage EVLT token operations (mint, burn, transfer)' },
  evlt_topup: { title: 'EVLT Topup', description: 'Handle EVLT token topup and batch operations' },
  grnd_token: { title: 'GRND Token', description: 'Manage GRND token operations and player rewards' },
  matchmaking: { title: 'Matchmaking', description: 'Manage game matchmaking and tournament matching' },
  tournament_token: { title: 'Tournament Token', description: 'Manage tournament NFT passes and operations' }
};