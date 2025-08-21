import { promises as fs } from 'fs';
import path from 'path';
import { createDynamicConfig } from './dojo-config.js';

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

// Load all profiles
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
    // File doesn't exist or is invalid, return default structure
    const defaultProfile = createDefaultProfile();
    return {
      profiles: [defaultProfile],
      activeProfileId: 'default'
    };
  }
}

// Get profile by ID
async function getProfileById(profileId) {
  const data = await loadProfiles();
  return data.profiles.find(p => p.id === profileId);
}

// Get active profile
async function getActiveProfile() {
  const data = await loadProfiles();
  return data.profiles.find(p => p.id === data.activeProfileId);
}

// Create config from profile
function createConfigFromProfile(profile) {
  if (profile.isDefault) {
    // For default profile, use env vars directly
    return {
      server: {
        port: process.env.PORT || 3000,
        nodeEnv: process.env.NODE_ENV || 'development'
      },
      admin: {
        privateKey: process.env.ADMIN_PRIVATE_KEY,
        address: process.env.ADMIN_ADDRESS
      },
      dojo: {
        rpcUrl: process.env.DOJO_RPC_URL || 'https://api.cartridge.gg/x/dev-evolute-duel/katana',
        toriiUrl: process.env.DOJO_TORII_URL || 'https://api.cartridge.gg/x/dev-evolute-duel/torii',
        relayUrl: process.env.DOJO_RELAY_URL || 'http://localhost:9090',
        worldAddress: process.env.DOJO_WORLD_ADDRESS || '0x0230035e44105bbc11acf2dd1b271a78d53627a810e6a2fb024fd2edcf273c9c'
      },
      contracts: {
        gameContract: process.env.GAME_CONTRACT_ADDRESS,
        playerProfileActions: process.env.PLAYER_PROFILE_ACTIONS_ADDRESS,
        tutorialContract: process.env.TUTORIAL_CONTRACT_ADDRESS,
        accountMigration: process.env.ACCOUNT_MIGRATION_ADDRESS
      },
      security: {
        apiSecretKey: process.env.API_SECRET_KEY
      }
    };
  }

  return {
    server: {
      port: process.env.PORT || 3000,
      nodeEnv: process.env.NODE_ENV || 'development'
    },
    admin: {
      privateKey: profile.adminPrivateKey,
      address: profile.adminAddress
    },
    dojo: {
      rpcUrl: profile.rpcUrl,
      toriiUrl: profile.toriiUrl,
      relayUrl: process.env.DOJO_RELAY_URL || 'http://localhost:9090',
      worldAddress: profile.worldAddress
    },
    contracts: profile.contracts || {},
    security: {
      apiSecretKey: process.env.API_SECRET_KEY
    }
  };
}

// Profile middleware
export async function withProfile(request) {
  try {
    // Get profile ID from header
    const profileId = request.headers.get('X-Profile-ID');
    
    let profile;
    let config;
    
    if (profileId) {
      // Try to get specific profile
      profile = await getProfileById(profileId);
      
      if (!profile) {
        return {
          success: false,
          error: `Profile '${profileId}' not found`,
          statusCode: 404
        };
      }
      
      console.log(`🔧 Using profile from X-Profile-ID header: ${profile.name}`);
      config = createConfigFromProfile(profile);
    } else {
      // Use active profile (fallback)
      profile = await getActiveProfile();
      
      if (!profile) {
        // Ultimate fallback - use default config
        config = await createDynamicConfig();
        console.log('🔧 Using fallback configuration');
      } else {
        console.log(`🔧 Using active profile: ${profile.name}`);
        config = createConfigFromProfile(profile);
      }
    }

    return {
      success: true,
      profile,
      config
    };
  } catch (error) {
    console.error('Profile middleware error:', error);
    
    // Fallback to default config
    const config = await createDynamicConfig();
    
    return {
      success: true,
      profile: null,
      config,
      warning: 'Using fallback configuration due to error'
    };
  }
}

// Helper function to create protected API handler with profile support
export function createProfileAwareHandler(handler) {
  return async function(request, context) {
    const profileResult = await withProfile(request);
    
    if (!profileResult.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: profileResult.error 
        }),
        { 
          status: profileResult.statusCode || 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Add profile info to request context
    request.profileInfo = {
      profile: profileResult.profile,
      config: profileResult.config,
      warning: profileResult.warning
    };
    
    return handler(request, context);
  };
}