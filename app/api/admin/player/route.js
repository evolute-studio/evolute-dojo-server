import { NextResponse } from 'next/server';
import { getDojoClient } from '../../../lib/dojo-client.js';
import { config } from '../../../lib/dojo-config.js';

function authenticateApiKey(request) {
  const apiKey = request.headers.get('x-api-key') || 
                 request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!apiKey || apiKey !== config.security.apiSecretKey) {
    return false;
  }
  return true;
}

export async function POST(request) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, ...params } = body;

    if (!action) {
      return NextResponse.json({
        success: false,
        error: 'Action is required'
      }, { status: 400 });
    }

    const dojoClient = getDojoClient();
    let result;
    let message = '';

    switch (action) {
      case 'set_player':
        const { playerId, username, balance, gamesPlayed, activeSkin, role } = params;
        if (!playerId || username === undefined || balance === undefined || 
            gamesPlayed === undefined || activeSkin === undefined || role === undefined) {
          return NextResponse.json({
            success: false,
            error: 'All player fields (playerId, username, balance, gamesPlayed, activeSkin, role) are required'
          }, { status: 400 });
        }
        result = await dojoClient.setPlayer(playerId, username, balance, gamesPlayed, activeSkin, role);
        message = 'Player set successfully';
        break;

      case 'change_username':
        const { newUsername } = params;
        if (newUsername === undefined) {
          return NextResponse.json({
            success: false,
            error: 'newUsername is required'
          }, { status: 400 });
        }
        result = await dojoClient.changeUsername(newUsername);
        message = 'Username changed successfully';
        break;

      case 'change_skin':
        const { skinId } = params;
        if (skinId === undefined) {
          return NextResponse.json({
            success: false,
            error: 'skinId is required'
          }, { status: 400 });
        }
        result = await dojoClient.changeSkin(skinId);
        message = 'Skin changed successfully';
        break;

      case 'become_bot':
        result = await dojoClient.becomeBot();
        message = 'Player became bot successfully';
        break;

      case 'become_controller':
        result = await dojoClient.becomeController();
        message = 'Player became controller successfully';
        break;

      default:
        return NextResponse.json({
          success: false,
          error: `Unknown action: ${action}`
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message,
      data: {
        action,
        transactionHash: result.transaction_hash,
        method: 'dojo-generated'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Player action error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to execute player action',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}