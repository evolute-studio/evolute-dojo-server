'use client';

import ConnectionProfiles from '../../ConnectionProfiles';

export default function SettingsView() {
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