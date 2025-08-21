'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
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
  BarChart3
} from 'lucide-react';
import ActionModal from './ActionModal';

const CONTRACT_ACTIONS = {
  tutorial: [
    {
      id: 'start_tutorial',
      name: 'Start Tutorial',
      description: 'Begin tutorial sequence',
      icon: Play,
      variant: 'default',
      requiresModal: true
    },
    {
      id: 'complete_step',
      name: 'Complete Step',
      description: 'Mark tutorial step as complete',
      icon: Flag,
      variant: 'outline',
      requiresModal: true
    },
    {
      id: 'reset_tutorial',
      name: 'Reset Tutorial',
      description: 'Reset tutorial progress',
      icon: X,
      variant: 'destructive',
      requiresModal: false
    }
  ],
  account_migration: [
    {
      id: 'migrate_account',
      name: 'Migrate Account',
      description: 'Migrate account to new system',
      icon: ArrowRight,
      variant: 'default',
      requiresModal: true
    },
    {
      id: 'check_migration_status',
      name: 'Check Migration Status',
      description: 'Verify migration status',
      icon: Eye,
      variant: 'outline',
      requiresModal: false
    },
    {
      id: 'rollback_migration',
      name: 'Rollback Migration',
      description: 'Rollback failed migration',
      icon: X,
      variant: 'destructive',
      requiresModal: true
    }
  ],
  game: [
    {
      id: 'create_game',
      name: 'Create Game',
      description: 'Start a new game session',
      icon: Play,
      variant: 'default',
      requiresModal: false
    },
    {
      id: 'join_game', 
      name: 'Join Game',
      description: 'Join an existing game',
      icon: Users,
      variant: 'outline',
      requiresModal: true
    },
    {
      id: 'cancel_game',
      name: 'Cancel Game',
      description: 'Cancel current game',
      icon: X,
      variant: 'destructive',
      requiresModal: false
    },
    {
      id: 'skip_move',
      name: 'Skip Move',
      description: 'Skip current turn',
      icon: SkipForward,
      variant: 'outline',
      requiresModal: false
    },
    {
      id: 'make_move',
      name: 'Make Move',
      description: 'Execute a game move',
      icon: MousePointer,
      variant: 'outline',
      requiresModal: true
    },
    {
      id: 'commit_tiles',
      name: 'Commit Tiles',
      description: 'Commit tile placement',
      icon: Grid,
      variant: 'outline',
      requiresModal: true
    },
    {
      id: 'reveal_tile',
      name: 'Reveal Tile',
      description: 'Reveal a hidden tile',
      icon: Eye,
      variant: 'outline',
      requiresModal: true
    },
    {
      id: 'request_next_tile',
      name: 'Request Next Tile',
      description: 'Request next tile in sequence',
      icon: ArrowRight,
      variant: 'outline',
      requiresModal: true
    },
    {
      id: 'finish_game',
      name: 'Finish Game',
      description: 'Complete the current game',
      icon: Flag,
      variant: 'secondary',
      requiresModal: true
    }
  ],
  player: [
    {
      id: 'set_player',
      name: 'Set Player Profile',
      description: 'Configure player profile',
      icon: User,
      variant: 'outline',
      requiresModal: true
    },
    {
      id: 'change_username',
      name: 'Change Username',
      description: 'Update player username',
      icon: Settings,
      variant: 'outline',
      requiresModal: true
    },
    {
      id: 'change_skin',
      name: 'Change Skin',
      description: 'Update player appearance',
      icon: Gamepad2,
      variant: 'outline',
      requiresModal: true
    },
    {
      id: 'become_bot',
      name: 'Become Bot',
      description: 'Switch to bot mode',
      icon: Cpu,
      variant: 'secondary',
      requiresModal: false
    },
    {
      id: 'become_controller',
      name: 'Become Controller',
      description: 'Switch to controller mode',
      icon: Joystick,
      variant: 'secondary',
      requiresModal: false
    }
  ],
  system: [
    {
      id: 'server_health',
      name: 'Check Server Health',
      description: 'Verify server status',
      icon: Server,
      variant: 'outline',
      requiresModal: false
    },
    {
      id: 'refresh_data',
      name: 'Refresh Data',
      description: 'Reload all system data',
      icon: Activity,
      variant: 'outline',
      requiresModal: false
    }
  ],
  monitoring: [
    {
      id: 'view_logs',
      name: 'View Logs',
      description: 'Check system logs',
      icon: BarChart3,
      variant: 'outline',
      requiresModal: false
    },
    {
      id: 'performance_metrics',
      name: 'Performance Metrics',
      description: 'View performance data',
      icon: Activity,
      variant: 'outline',
      requiresModal: false
    }
  ]
};

export default function ContractActions({ 
  selectedContract, 
  onActionExecute,
  isLoading 
}) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    actionType: '',
    actionName: '',
    isGameAction: true
  });

  const actions = CONTRACT_ACTIONS[selectedContract] || [];

  const openModal = (actionType, actionName, isGameAction = true) => {
    setModalState({
      isOpen: true,
      actionType,
      actionName,
      isGameAction
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleModalSubmit = async (formData) => {
    await onActionExecute(modalState.actionType, formData, modalState.isGameAction);
    closeModal();
  };

  const handleActionClick = (action) => {
    if (action.requiresModal) {
      const isGameAction = selectedContract === 'game';
      openModal(action.id, action.name, isGameAction);
    } else {
      const isGameAction = selectedContract === 'game';
      onActionExecute(action.id, {}, isGameAction);
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
    tutorial: {
      title: 'Tutorial Contract Actions',
      description: 'Manage tutorial system and player progression'
    },
    account_migration: {
      title: 'Account Migration Actions',
      description: 'Handle account migration and data transfer'
    },
    game: {
      title: 'Game Contract Actions',
      description: 'Execute game-related transactions and operations'
    },
    player: {
      title: 'Player Contract Actions', 
      description: 'Manage player profiles and settings'
    },
    system: {
      title: 'System Operations',
      description: 'Monitor and manage system health'
    },
    monitoring: {
      title: 'Monitoring & Analytics',
      description: 'View logs and performance metrics'
    }
  };

  const info = contractInfo[selectedContract];

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{info?.title}</h1>
          <p className="text-muted-foreground">{info?.description}</p>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Card key={action.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{action.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4 min-h-[2.5rem]">
                    {action.description}
                  </CardDescription>
                  <Button
                    onClick={() => handleActionClick(action)}
                    disabled={isLoading}
                    variant={action.variant}
                    className="w-full"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icon className="mr-2 h-4 w-4" />
                    )}
                    {action.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {actions.length === 0 && (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              No Actions Available
            </h3>
            <p className="text-sm text-muted-foreground">
              No actions are configured for this section yet
            </p>
          </div>
        )}
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