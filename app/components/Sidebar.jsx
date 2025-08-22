'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import UserInfo from './UserInfo';
import { 
  FileCode, 
  User, 
  Settings, 
  Activity,
  ChevronRight,
  Sun,
  Moon,
  Database,
  Users,
  BarChart3
} from 'lucide-react';

const CONTRACTS = [
  {
    id: 'game',
    name: 'Game Contract',
    icon: FileCode,
    description: 'Game logic and mechanics'
  },
  {
    id: 'player',
    name: 'Player Contract', 
    icon: User,
    description: 'Player management and profiles'
  },
  {
    id: 'tutorial',
    name: 'Tutorial Contract',
    icon: FileCode,
    description: 'Tutorial system and progression'
  },
  {
    id: 'account_migration',
    name: 'Account Migration',
    icon: FileCode,
    description: 'Account migration utilities'
  }
];

const MODELS = [
  {
    id: 'games',
    name: 'Games',
    icon: Database,
    description: 'Query and manage game entities'
  },
  {
    id: 'players',
    name: 'Players', 
    icon: Users,
    description: 'Query and manage player entities'
  }
];

const ADDITIONAL_SECTIONS = [
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    description: 'Game and player analytics dashboard'
  },
  {
    id: 'system',
    name: 'System Info',
    icon: Settings,
    description: 'System status and configuration'
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    icon: Activity,
    description: 'Logs and performance metrics'
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    description: 'Connection profiles and configuration'
  }
];

export default function Sidebar({ selectedContract, onContractSelect }) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="bg-card border-r fixed left-0 top-0 h-screen flex flex-col" style={{ width: '294px' }}>
      {/* Header */}
      <div className="p-6 border-b flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Evolute</h1>
            <p className="text-sm text-muted-foreground">Admin panel</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-8 w-8 p-0"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Contracts
          </h2>
          <div className="space-y-2">
            {CONTRACTS.map((contract) => {
              const Icon = contract.icon;
              const isSelected = selectedContract === contract.id;
              
              return (
                <Button
                  key={contract.id}
                  variant={isSelected ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                  onClick={() => onContractSelect(contract.id)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{contract.name}</div>
                      <div className="text-xs opacity-75 truncate">
                        {contract.description}
                      </div>
                    </div>
                    {isSelected && (
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Models Section */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Models
          </h2>
          <div className="space-y-2">
            {MODELS.map((model) => {
              const Icon = model.icon;
              const isSelected = selectedContract === model.id;
              
              return (
                <Button
                  key={model.id}
                  variant={isSelected ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                  onClick={() => onContractSelect(model.id)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{model.name}</div>
                      <div className="text-xs opacity-75 truncate">
                        {model.description}
                      </div>
                    </div>
                    {isSelected && (
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Additional Sections */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Additional
          </h2>
          <div className="space-y-2">
            {ADDITIONAL_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isSelected = selectedContract === section.id;
              
              return (
                <Button
                  key={section.id}
                  variant={isSelected ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                  onClick={() => onContractSelect(section.id)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{section.name}</div>
                      <div className="text-xs opacity-75 truncate">
                        {section.description}
                      </div>
                    </div>
                    {isSelected && (
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t space-y-3 flex-shrink-0">
        <UserInfo />
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Server Online</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}