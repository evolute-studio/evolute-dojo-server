import { NextResponse } from 'next/server';
import { getToriiClient } from '../../../lib/torii-client.js';
import { config } from '../../../lib/dojo-config.js';
import { createProfileAwareHandler } from '../../../lib/profileMiddleware.js';

function authenticateApiKey(request) {
  const apiKey = request.headers.get('x-api-key') || 
                 request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!apiKey || apiKey !== config.security.apiSecretKey) {
    return false;
  }
  return true;
}

async function handleGetPlayers(request) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10000');

    const profileInfo = request.profileInfo;
    console.log(`Fetching players using profile: ${profileInfo?.profile?.name || 'Default'}`);
    
    const toriiClient = getToriiClient(profileInfo?.config);
    const result = await toriiClient.getPlayers(limit);

    // Format players for display and sort by balance (highest first)
    const formattedPlayers = result.players
      .map((player, index) => ({
        id: index,
        playerId: player.player_id,
        username: hexToString(player.username),
        usernameRaw: player.username, // Keep raw hex for filtering
        balance: player.balance || 0,
        gamesPlayed: player.games_played || 0,
        activeSkin: player.active_skin || 0,
        role: player.role || 0,
        roleText: getRoleText(player.role || 0),
        tutorialCompleted: player.tutorial_completed || false,
        // Raw data for filtering
        playerIdFull: player.player_id,
        balanceRaw: player.balance,
        gamesPlayedRaw: player.games_played,
        roleRaw: player.role
      }))
      .sort((a, b) => (b.balanceRaw || 0) - (a.balanceRaw || 0)); // Sort by balance descending

    const response = {
      success: true,
      data: {
        players: formattedPlayers,
        totalCount: result.totalCount,
        limit,
        profileUsed: profileInfo?.profile?.name || 'Default Configuration'
      },
      timestamp: new Date().toISOString()
    };

    if (profileInfo?.warning) {
      response.warning = profileInfo.warning;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Get players error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch players',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

function getRoleText(role) {
  const roleMap = {
    0: 'Guest',
    1: 'Controller', 
    2: 'Bot'
  };
  return roleMap[role] || 'Unknown';
}

function hexToString(hex) {
  if (!hex || hex === '0x0') return 'Unknown';
  
  // Remove 0x prefix if present
  let cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  
  // Convert hex to string
  let result = '';
  for (let i = 0; i < cleanHex.length; i += 2) {
    const byte = parseInt(cleanHex.substr(i, 2), 16);
    if (byte !== 0) { // Skip null bytes
      result += String.fromCharCode(byte);
    }
  }
  return result || 'Unknown';
}

export const GET = createProfileAwareHandler(handleGetPlayers);