'use client';

import { Settings, MousePointer } from 'lucide-react';
import ContractActionsView from './contracts/ContractActionsView';
import GamesView from './models/GamesView';
import PlayersView from './models/PlayersView';
import SystemView from './sections/SystemView';
import MonitoringView from './sections/MonitoringView';
import AnalyticsView from './sections/AnalyticsView';
import SettingsView from './sections/SettingsView';

export default function ContractActionsNew({ 
  selectedContract, 
  onActionExecute,
  isLoading 
}) {
  // Models section
  if (selectedContract === 'players') {
    return <PlayersView onActionExecute={onActionExecute} />;
  }

  if (selectedContract === 'games') {
    return <GamesView onActionExecute={onActionExecute} />;
  }

  // Additional sections
  if (selectedContract === 'system') {
    return <SystemView />;
  }

  if (selectedContract === 'monitoring') {
    return <MonitoringView />;
  }

  if (selectedContract === 'analytics') {
    return <AnalyticsView />;
  }

  if (selectedContract === 'settings') {
    return <SettingsView />;
  }

  // No contract selected
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

  // Contracts section - default for all contract types
  return (
    <ContractActionsView 
      selectedContract={selectedContract}
      onActionExecute={onActionExecute}
      isLoading={isLoading}
    />
  );
}