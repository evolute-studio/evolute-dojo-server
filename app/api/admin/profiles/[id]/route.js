import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PROFILES_FILE = path.join(process.cwd(), 'data', 'profiles.json');

// Create default profile from environment variables
function createDefaultProfile() {
  return {
    id: 'default',
    name: 'Environment Variables',
    description: 'Default configuration from environment variables (Read-only)',
    adminAddress: process.env.ADMIN_ADDRESS || 'Not configured',
    adminPrivateKey: process.env.ADMIN_PRIVATE_KEY || 'Not configured',
    rpcUrl: process.env.DOJO_RPC_URL || 'Not configured',
    toriiUrl: process.env.DOJO_TORII_URL || 'Not configured',
    worldAddress: process.env.DOJO_WORLD_ADDRESS || 'Not configured',
    contracts: {
      gameContract: process.env.GAME_CONTRACT_ADDRESS || 'Not configured',
      playerProfileActions: process.env.PLAYER_PROFILE_ACTIONS_ADDRESS || 'Not configured',
      tutorialContract: process.env.TUTORIAL_CONTRACT_ADDRESS || 'Not configured',
      accountMigration: process.env.ACCOUNT_MIGRATION_ADDRESS || 'Not configured'
    },
    isDefault: true,
    isReadOnly: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// Load profiles from file
async function loadProfiles() {
  try {
    const data = await fs.readFile(PROFILES_FILE, 'utf8');
    const profilesData = JSON.parse(data);
    
    // Always ensure default profile exists and is first
    const defaultProfile = createDefaultProfile();
    const customProfiles = profilesData.profiles.filter(p => p.id !== 'default');
    
    return {
      profiles: [defaultProfile, ...customProfiles],
      activeProfileId: profilesData.activeProfileId || 'default'
    };
  } catch (error) {
    // File doesn't exist or is invalid, return default structure with default profile
    const defaultProfile = createDefaultProfile();
    return {
      profiles: [defaultProfile],
      activeProfileId: 'default'
    };
  }
}

// Save profiles to file
async function saveProfiles(profilesData) {
  const DATA_DIR = path.dirname(PROFILES_FILE);
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
  await fs.writeFile(PROFILES_FILE, JSON.stringify(profilesData, null, 2));
}

// GET - Get specific profile
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const data = await loadProfiles();
    const profile = data.profiles.find(p => p.id === id);
    
    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Failed to get profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}

// PUT - Update profile
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Prevent editing default profile
    if (id === 'default') {
      return NextResponse.json(
        { success: false, error: 'Default profile cannot be edited' },
        { status: 403 }
      );
    }
    
    const updateData = await request.json();
    const data = await loadProfiles();
    
    const profileIndex = data.profiles.findIndex(p => p.id === id);
    if (profileIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    const requiredFields = ['name', 'adminAddress', 'adminPrivateKey', 'rpcUrl', 'toriiUrl', 'worldAddress'];
    for (const field of requiredFields) {
      if (!updateData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate contract addresses if provided
    if (updateData.contracts) {
      const contractFields = Object.entries(updateData.contracts);
      for (const [contractName, contractAddress] of contractFields) {
        if (contractAddress && contractAddress.trim() && !contractAddress.startsWith('0x')) {
          return NextResponse.json(
            { success: false, error: `Invalid ${contractName} address format` },
            { status: 400 }
          );
        }
      }
    }

    // Check for duplicate names (excluding current profile)
    const duplicateName = data.profiles.some(p => p.id !== id && p.name === updateData.name);
    if (duplicateName) {
      return NextResponse.json(
        { success: false, error: 'Profile name already exists' },
        { status: 400 }
      );
    }

    // Validate format
    if (!updateData.adminAddress.startsWith('0x') || 
        !updateData.adminPrivateKey.startsWith('0x') || 
        !updateData.worldAddress.startsWith('0x')) {
      return NextResponse.json(
        { success: false, error: 'Invalid address format' },
        { status: 400 }
      );
    }

    try {
      new URL(updateData.rpcUrl);
      new URL(updateData.toriiUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Update profile
    data.profiles[profileIndex] = {
      ...data.profiles[profileIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    await saveProfiles(data);

    return NextResponse.json({
      success: true,
      profile: {
        ...data.profiles[profileIndex],
        adminPrivateKey: '••••••••••••••••'
      }
    });
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// DELETE - Delete profile
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Prevent deleting default profile
    if (id === 'default') {
      return NextResponse.json(
        { success: false, error: 'Default profile cannot be deleted' },
        { status: 403 }
      );
    }
    
    const data = await loadProfiles();
    
    const profileIndex = data.profiles.findIndex(p => p.id === id);
    if (profileIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Don't allow deletion of active profile
    if (data.activeProfileId === id) {
      // Switch to default profile if deleting active profile
      data.activeProfileId = 'default';
    }

    // Remove profile
    data.profiles.splice(profileIndex, 1);
    await saveProfiles(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete profile' },
      { status: 500 }
    );
  }
}