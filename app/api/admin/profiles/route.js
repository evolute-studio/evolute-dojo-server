import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PROFILES_FILE = path.join(process.cwd(), 'data', 'profiles.json');
const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

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
  await ensureDataDir();
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
  await ensureDataDir();
  await fs.writeFile(PROFILES_FILE, JSON.stringify(profilesData, null, 2));
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// GET - List all profiles
export async function GET(request) {
  try {
    const data = await loadProfiles();
    const activeProfile = data.profiles.find(p => p.id === data.activeProfileId);
    
    return NextResponse.json({
      success: true,
      profiles: data.profiles.map(profile => ({
        ...profile,
        // Don't expose private key in list view
        adminPrivateKey: profile.isDefault ? profile.adminPrivateKey : '••••••••••••••••'
      })),
      activeProfile: activeProfile ? {
        ...activeProfile,
        adminPrivateKey: activeProfile.isDefault ? activeProfile.adminPrivateKey : '••••••••••••••••'
      } : null
    });
  } catch (error) {
    console.error('Failed to load profiles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load profiles' },
      { status: 500 }
    );
  }
}

// POST - Create new profile
export async function POST(request) {
  try {
    const profileData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'adminAddress', 'adminPrivateKey', 'rpcUrl', 'toriiUrl', 'worldAddress'];
    for (const field of requiredFields) {
      if (!profileData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate contract addresses if provided
    if (profileData.contracts) {
      const contractFields = Object.entries(profileData.contracts);
      for (const [contractName, contractAddress] of contractFields) {
        if (contractAddress && contractAddress.trim() && !contractAddress.startsWith('0x')) {
          return NextResponse.json(
            { success: false, error: `Invalid ${contractName} address format` },
            { status: 400 }
          );
        }
      }
    }

    // Validate addresses format
    if (!profileData.adminAddress.startsWith('0x')) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin address format' },
        { status: 400 }
      );
    }

    if (!profileData.adminPrivateKey.startsWith('0x')) {
      return NextResponse.json(
        { success: false, error: 'Invalid private key format' },
        { status: 400 }
      );
    }

    if (!profileData.worldAddress.startsWith('0x')) {
      return NextResponse.json(
        { success: false, error: 'Invalid world address format' },
        { status: 400 }
      );
    }

    // Validate URLs
    try {
      new URL(profileData.rpcUrl);
      new URL(profileData.toriiUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const data = await loadProfiles();
    
    // Check for duplicate names
    if (data.profiles.some(p => p.name === profileData.name)) {
      return NextResponse.json(
        { success: false, error: 'Profile name already exists' },
        { status: 400 }
      );
    }

    const newProfile = {
      id: generateId(),
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.profiles.push(newProfile);
    
    // If this is the first custom profile (excluding default), make it active
    const customProfiles = data.profiles.filter(p => !p.isDefault);
    if (customProfiles.length === 1) {
      data.activeProfileId = newProfile.id;
    }

    await saveProfiles(data);

    return NextResponse.json({
      success: true,
      profile: {
        ...newProfile,
        adminPrivateKey: '••••••••••••••••'
      }
    });
  } catch (error) {
    console.error('Failed to create profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}