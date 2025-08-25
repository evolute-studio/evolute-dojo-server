'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Save, 
  Check, 
  Trash2, 
  Server, 
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronRight,
  Settings2,
  Loader2,
  Download,
  Upload,
  FileText
} from 'lucide-react';

export default function ConnectionProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    adminAddress: '',
    adminPrivateKey: '',
    rpcUrl: '',
    toriiUrl: '',
    worldAddress: '',
    contracts: {
      gameContract: '',
      playerProfileActions: '',
      tutorialContract: '',
      accountMigration: '',
      evltToken: '',
      evltTopup: '',
      grndToken: '',
      matchmaking: '',
      tournamentToken: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Load profiles on mount
  useEffect(() => {
    loadProfiles();
  }, []);

  // Set form data when profile selected
  useEffect(() => {
    if (selectedProfile) {
      setFormData({
        name: selectedProfile.name || '',
        description: selectedProfile.description || '',
        adminAddress: selectedProfile.adminAddress || '',
        adminPrivateKey: selectedProfile.adminPrivateKey || '',
        rpcUrl: selectedProfile.rpcUrl || '',
        toriiUrl: selectedProfile.toriiUrl || '',
        worldAddress: selectedProfile.worldAddress || '',
        contracts: {
          gameContract: selectedProfile.contracts?.gameContract || '',
          playerProfileActions: selectedProfile.contracts?.playerProfileActions || '',
          tutorialContract: selectedProfile.contracts?.tutorialContract || '',
          accountMigration: selectedProfile.contracts?.accountMigration || '',
          evltToken: selectedProfile.contracts?.evltToken || '',
          evltTopup: selectedProfile.contracts?.evltTopup || '',
          grndToken: selectedProfile.contracts?.grndToken || '',
          matchmaking: selectedProfile.contracts?.matchmaking || '',
          tournamentToken: selectedProfile.contracts?.tournamentToken || ''
        }
      });
      setErrors({});
    }
  }, [selectedProfile]);

  const loadProfiles = async () => {
    try {
      const response = await fetch('/api/admin/profiles');
      const data = await response.json();
      if (data.success) {
        setProfiles(data.profiles || []);
        setActiveProfile(data.activeProfile || null);
        
        // Select first profile or active profile
        if (!selectedProfile && data.profiles?.length > 0) {
          setSelectedProfile(data.activeProfile || data.profiles[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load profiles:', error);
    }
  };

  const validateProfile = (profile) => {
    const newErrors = {};
    
    if (!profile.name.trim()) {
      newErrors.name = 'Profile name is required';
    }
    
    if (!profile.adminAddress || !profile.adminAddress.startsWith('0x')) {
      newErrors.adminAddress = 'Valid admin address is required';
    }
    
    if (!profile.adminPrivateKey || !profile.adminPrivateKey.startsWith('0x')) {
      newErrors.adminPrivateKey = 'Valid private key is required';
    }
    
    if (!profile.rpcUrl || !profile.rpcUrl.startsWith('http')) {
      newErrors.rpcUrl = 'Valid RPC URL is required';
    }
    
    if (!profile.toriiUrl || !profile.toriiUrl.startsWith('http')) {
      newErrors.toriiUrl = 'Valid Torii URL is required';
    }
    
    if (!profile.worldAddress || !profile.worldAddress.startsWith('0x')) {
      newErrors.worldAddress = 'Valid world address is required';
    }

    // Validate contract addresses
    const contractFields = Object.entries(profile.contracts || {});
    for (const [contractName, contractAddress] of contractFields) {
      if (contractAddress && contractAddress.trim() && !contractAddress.startsWith('0x')) {
        newErrors[`contracts.${contractName}`] = `Invalid ${contractName} address format`;
      }
    }

    return newErrors;
  };

  const handleSave = async () => {
    if (selectedProfile?.isReadOnly) return;

    const validationErrors = validateProfile(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    try {
      const isEditing = selectedProfile && selectedProfile.id !== 'new';
      const url = isEditing 
        ? `/api/admin/profiles/${selectedProfile.id}`
        : '/api/admin/profiles';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        await loadProfiles();
        // Select the created/updated profile
        if (data.profile) {
          const updatedProfile = profiles.find(p => p.id === data.profile.id) || data.profile;
          setSelectedProfile(updatedProfile);
        }
      } else {
        setErrors({ general: data.error || 'Failed to save profile' });
      }
    } catch (error) {
      setErrors({ general: 'Failed to save profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleActivate = async () => {
    if (!selectedProfile || selectedProfile.id === activeProfile?.id) return;

    try {
      const response = await fetch(`/api/admin/profiles/${selectedProfile.id}/activate`, {
        method: 'POST'
      });
      
      if (response.ok) {
        await loadProfiles();
      }
    } catch (error) {
      console.error('Failed to activate profile:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedProfile || selectedProfile.isDefault || !confirm('Are you sure you want to delete this profile?')) return;

    try {
      const response = await fetch(`/api/admin/profiles/${selectedProfile.id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await loadProfiles();
        // Select first available profile
        if (profiles.length > 0) {
          setSelectedProfile(profiles[0]);
        }
      }
    } catch (error) {
      console.error('Failed to delete profile:', error);
    }
  };

  const handleNewProfile = () => {
    const newProfile = {
      id: 'new',
      name: '',
      description: '',
      adminAddress: '',
      adminPrivateKey: '',
      rpcUrl: '',
      toriiUrl: '',
      worldAddress: '',
      contracts: {
        gameContract: '',
        playerProfileActions: '',
        tutorialContract: '',
        accountMigration: '',
        evltToken: '',
        evltTopup: '',
        grndToken: '',
        matchmaking: '',
        tournamentToken: ''
      },
      isNew: true
    };
    setSelectedProfile(newProfile);
  };

  const handleInputChange = (field, value) => {
    if (selectedProfile?.isReadOnly) return;
    
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleExportProfiles = async () => {
    setIsExporting(true);
    try {
      // Get all non-default profiles for export
      const exportProfiles = profiles.filter(profile => !profile.isDefault);
      
      const exportData = {
        version: "1.0",
        exportDate: new Date().toISOString(),
        profiles: exportProfiles
      };

      // Create and download JSON file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `connection-profiles-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      setErrors({ general: 'Failed to export profiles' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportProfiles = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const importData = JSON.parse(e.target?.result);
        
        // Validate import data structure
        if (!importData.profiles || !Array.isArray(importData.profiles)) {
          throw new Error('Invalid import file format');
        }

        let importedCount = 0;
        let skippedCount = 0;

        for (const profile of importData.profiles) {
          // Validate required fields
          if (!profile.name || !profile.adminAddress || !profile.rpcUrl) {
            skippedCount++;
            continue;
          }

          // Check if profile with same name already exists
          const existingProfile = profiles.find(p => p.name === profile.name);
          if (existingProfile && !confirm(`Profile "${profile.name}" already exists. Replace it?`)) {
            skippedCount++;
            continue;
          }

          // Import profile
          try {
            const url = existingProfile 
              ? `/api/admin/profiles/${existingProfile.id}`
              : '/api/admin/profiles';
            
            const response = await fetch(url, {
              method: existingProfile ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(profile)
            });

            if (response.ok) {
              importedCount++;
            } else {
              skippedCount++;
            }
          } catch (error) {
            console.error('Failed to import profile:', profile.name, error);
            skippedCount++;
          }
        }

        // Refresh profiles list
        await loadProfiles();
        
        // Show result
        const message = `Import completed: ${importedCount} profiles imported, ${skippedCount} skipped`;
        alert(message);
        
      } catch (error) {
        console.error('Import failed:', error);
        setErrors({ general: 'Failed to import profiles: ' + error.message });
      } finally {
        setIsImporting(false);
        // Clear file input
        event.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  const formatAddress = (addr) => {
    if (!addr || addr === 'Not configured') return addr;
    return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Profiles List */}
      <div className="w-80 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Connection Profiles</h3>
            <Button size="sm" onClick={handleNewProfile}>
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          
          {/* Export/Import buttons */}
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleExportProfiles}
              disabled={isExporting || profiles.filter(p => !p.isDefault).length === 0}
              className="flex-1"
            >
              {isExporting ? (
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <Download className="h-3 w-3 mr-1" />
              )}
              Export
            </Button>
            
            <div className="flex-1">
              <input
                type="file"
                accept=".json"
                onChange={handleImportProfiles}
                disabled={isImporting}
                className="hidden"
                id="profile-import"
              />
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => document.getElementById('profile-import')?.click()}
                disabled={isImporting}
                className="w-full"
              >
                {isImporting ? (
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <Upload className="h-3 w-3 mr-1" />
                )}
                Import
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className={`p-3 rounded-lg cursor-pointer border transition-all ${
                  selectedProfile?.id === profile.id 
                    ? 'bg-accent border-accent-foreground/20' 
                    : 'hover:bg-muted border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${profile.isDefault ? 'bg-gradient-to-r from-gray-500 to-slate-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {profile.isDefault ? (
                      <Lock className="h-4 w-4 text-white" />
                    ) : (
                      <Server className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm truncate">{profile.name}</span>
                      {activeProfile?.id === profile.id && (
                        <Badge variant="default" className="text-xs px-1.5 py-0">Active</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      {profile.isDefault && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0">Default</Badge>
                      )}
                      {profile.isReadOnly && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0">Read-only</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {formatAddress(profile.adminAddress)}
                    </p>
                  </div>
                  
                  {selectedProfile?.id === profile.id && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Profile Form */}
      <div className="flex-1 overflow-y-auto">
        {selectedProfile ? (
          <div className="p-6">
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedProfile.isNew ? 'New Profile' : selectedProfile.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedProfile.isReadOnly ? 'View configuration settings (read-only)' : 'Configure connection settings for this environment'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings2 className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              {errors.general && (
                <div className="mb-6 flex items-center space-x-2 text-sm text-red-600 bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.general}</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Basic Information</CardTitle>
                    <CardDescription>Profile name and description</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Profile Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Admin Account */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Admin Account</CardTitle>
                    <CardDescription>Account used for executing transactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="adminAddress">Admin Address *</Label>
                      <Input
                        id="adminAddress"
                        placeholder="0x..."
                        value={formData.adminAddress}
                        onChange={(e) => handleInputChange('adminAddress', e.target.value)}
                        disabled={selectedProfile.isReadOnly}
                        className={errors.adminAddress ? 'border-red-500' : ''}
                      />
                      {errors.adminAddress && <p className="text-xs text-red-500 mt-1">{errors.adminAddress}</p>}
                    </div>

                    <div>
                      <Label htmlFor="adminPrivateKey">Admin Private Key *</Label>
                      <div className="relative">
                        <Input
                          id="adminPrivateKey"
                          type={showPrivateKey ? "text" : "password"}
                          placeholder="0x..."
                          value={formData.adminPrivateKey}
                          onChange={(e) => handleInputChange('adminPrivateKey', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors.adminPrivateKey ? 'border-red-500' : ''}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPrivateKey(!showPrivateKey)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                        >
                          {showPrivateKey ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      {errors.adminPrivateKey && <p className="text-xs text-red-500 mt-1">{errors.adminPrivateKey}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Network Configuration */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Network Configuration</CardTitle>
                    <CardDescription>RPC and Torii connection settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rpcUrl">RPC URL *</Label>
                        <Input
                          id="rpcUrl"
                          placeholder="https://..."
                          value={formData.rpcUrl}
                          onChange={(e) => handleInputChange('rpcUrl', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors.rpcUrl ? 'border-red-500' : ''}
                        />
                        {errors.rpcUrl && <p className="text-xs text-red-500 mt-1">{errors.rpcUrl}</p>}
                      </div>

                      <div>
                        <Label htmlFor="toriiUrl">Torii URL *</Label>
                        <Input
                          id="toriiUrl"
                          placeholder="https://..."
                          value={formData.toriiUrl}
                          onChange={(e) => handleInputChange('toriiUrl', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors.toriiUrl ? 'border-red-500' : ''}
                        />
                        {errors.toriiUrl && <p className="text-xs text-red-500 mt-1">{errors.toriiUrl}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="worldAddress">World Address *</Label>
                      <Input
                        id="worldAddress"
                        placeholder="0x..."
                        value={formData.worldAddress}
                        onChange={(e) => handleInputChange('worldAddress', e.target.value)}
                        disabled={selectedProfile.isReadOnly}
                        className={errors.worldAddress ? 'border-red-500' : ''}
                      />
                      {errors.worldAddress && <p className="text-xs text-red-500 mt-1">{errors.worldAddress}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Contract Addresses */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Contract Addresses</CardTitle>
                    <CardDescription>Specific contract addresses for this environment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="gameContract">Game Contract</Label>
                        <Input
                          id="gameContract"
                          placeholder="0x..."
                          value={formData.contracts?.gameContract || ''}
                          onChange={(e) => handleInputChange('contracts.gameContract', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors['contracts.gameContract'] ? 'border-red-500' : ''}
                        />
                        {errors['contracts.gameContract'] && <p className="text-xs text-red-500 mt-1">{errors['contracts.gameContract']}</p>}
                      </div>

                      <div>
                        <Label htmlFor="playerProfileActions">Player Profile Actions</Label>
                        <Input
                          id="playerProfileActions"
                          placeholder="0x..."
                          value={formData.contracts?.playerProfileActions || ''}
                          onChange={(e) => handleInputChange('contracts.playerProfileActions', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors['contracts.playerProfileActions'] ? 'border-red-500' : ''}
                        />
                        {errors['contracts.playerProfileActions'] && <p className="text-xs text-red-500 mt-1">{errors['contracts.playerProfileActions']}</p>}
                      </div>

                      <div>
                        <Label htmlFor="tutorialContract">Tutorial Contract</Label>
                        <Input
                          id="tutorialContract"
                          placeholder="0x..."
                          value={formData.contracts?.tutorialContract || ''}
                          onChange={(e) => handleInputChange('contracts.tutorialContract', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors['contracts.tutorialContract'] ? 'border-red-500' : ''}
                        />
                        {errors['contracts.tutorialContract'] && <p className="text-xs text-red-500 mt-1">{errors['contracts.tutorialContract']}</p>}
                      </div>

                      <div>
                        <Label htmlFor="accountMigration">Account Migration</Label>
                        <Input
                          id="accountMigration"
                          placeholder="0x..."
                          value={formData.contracts?.accountMigration || ''}
                          onChange={(e) => handleInputChange('contracts.accountMigration', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors['contracts.accountMigration'] ? 'border-red-500' : ''}
                        />
                        {errors['contracts.accountMigration'] && <p className="text-xs text-red-500 mt-1">{errors['contracts.accountMigration']}</p>}
                      </div>

                      <div>
                        <Label htmlFor="evltToken">EVLT Token</Label>
                        <Input
                          id="evltToken"
                          placeholder="0x..."
                          value={formData.contracts?.evltToken || ''}
                          onChange={(e) => handleInputChange('contracts.evltToken', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors['contracts.evltToken'] ? 'border-red-500' : ''}
                        />
                        {errors['contracts.evltToken'] && <p className="text-xs text-red-500 mt-1">{errors['contracts.evltToken']}</p>}
                      </div>

                      <div>
                        <Label htmlFor="evltTopup">EVLT Topup</Label>
                        <Input
                          id="evltTopup"
                          placeholder="0x..."
                          value={formData.contracts?.evltTopup || ''}
                          onChange={(e) => handleInputChange('contracts.evltTopup', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors['contracts.evltTopup'] ? 'border-red-500' : ''}
                        />
                        {errors['contracts.evltTopup'] && <p className="text-xs text-red-500 mt-1">{errors['contracts.evltTopup']}</p>}
                      </div>

                      <div>
                        <Label htmlFor="grndToken">GRND Token</Label>
                        <Input
                          id="grndToken"
                          placeholder="0x..."
                          value={formData.contracts?.grndToken || ''}
                          onChange={(e) => handleInputChange('contracts.grndToken', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors['contracts.grndToken'] ? 'border-red-500' : ''}
                        />
                        {errors['contracts.grndToken'] && <p className="text-xs text-red-500 mt-1">{errors['contracts.grndToken']}</p>}
                      </div>

                      <div>
                        <Label htmlFor="matchmaking">Matchmaking</Label>
                        <Input
                          id="matchmaking"
                          placeholder="0x..."
                          value={formData.contracts?.matchmaking || ''}
                          onChange={(e) => handleInputChange('contracts.matchmaking', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors['contracts.matchmaking'] ? 'border-red-500' : ''}
                        />
                        {errors['contracts.matchmaking'] && <p className="text-xs text-red-500 mt-1">{errors['contracts.matchmaking']}</p>}
                      </div>

                      <div>
                        <Label htmlFor="tournamentToken">Tournament Token</Label>
                        <Input
                          id="tournamentToken"
                          placeholder="0x..."
                          value={formData.contracts?.tournamentToken || ''}
                          onChange={(e) => handleInputChange('contracts.tournamentToken', e.target.value)}
                          disabled={selectedProfile.isReadOnly}
                          className={errors['contracts.tournamentToken'] ? 'border-red-500' : ''}
                        />
                        {errors['contracts.tournamentToken'] && <p className="text-xs text-red-500 mt-1">{errors['contracts.tournamentToken']}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                {!selectedProfile.isReadOnly && (
                  <div className="flex items-center space-x-3 pt-4 border-t">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Profile
                        </>
                      )}
                    </Button>
                    
                    {selectedProfile.id !== activeProfile?.id && selectedProfile.id !== 'new' && (
                      <Button variant="outline" onClick={handleActivate}>
                        <Check className="h-4 w-4 mr-2" />
                        Activate
                      </Button>
                    )}
                    
                    {!selectedProfile.isDefault && selectedProfile.id !== 'new' && (
                      <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    )}
                  </div>
                )}

                {selectedProfile.isReadOnly && (
                  <div className="flex items-center space-x-3 pt-4 border-t">
                    {selectedProfile.id !== activeProfile?.id && (
                      <Button variant="outline" onClick={handleActivate}>
                        <Check className="h-4 w-4 mr-2" />
                        Activate
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Settings2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground">
                Select a Profile
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose a connection profile from the sidebar to view and edit settings
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}