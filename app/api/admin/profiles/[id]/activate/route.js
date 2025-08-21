import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PROFILES_FILE = path.join(process.cwd(), 'data', 'profiles.json');

// Load profiles from file
async function loadProfiles() {
  try {
    const data = await fs.readFile(PROFILES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { profiles: [], activeProfileId: null };
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

// POST - Activate profile
export async function POST(request, { params }) {
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

    // Update active profile
    data.activeProfileId = id;
    await saveProfiles(data);

    // Update environment variables dynamically (for current session)
    process.env.ADMIN_ADDRESS = profile.adminAddress;
    process.env.ADMIN_PRIVATE_KEY = profile.adminPrivateKey;
    process.env.DOJO_RPC_URL = profile.rpcUrl;
    process.env.DOJO_TORII_URL = profile.toriiUrl;
    process.env.DOJO_WORLD_ADDRESS = profile.worldAddress;

    console.log(`✅ Activated profile: ${profile.name}`);
    console.log(`Admin Address: ${profile.adminAddress}`);
    console.log(`RPC URL: ${profile.rpcUrl}`);
    console.log(`World Address: ${profile.worldAddress}`);

    return NextResponse.json({
      success: true,
      message: `Profile '${profile.name}' activated successfully`,
      activeProfile: {
        ...profile,
        adminPrivateKey: '••••••••••••••••'
      }
    });
  } catch (error) {
    console.error('Failed to activate profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to activate profile' },
      { status: 500 }
    );
  }
}