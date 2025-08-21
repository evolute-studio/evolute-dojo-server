import { NextResponse } from 'next/server';
import { getDojoClient } from '../../../../lib/dojo-client.js';
import { config } from '../../../../lib/dojo-config.js';
import { createProfileAwareHandler } from '../../../../lib/profileMiddleware.js';

function authenticateApiKey(request) {
  const apiKey = request.headers.get('x-api-key') || 
                 request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!apiKey || apiKey !== config.security.apiSecretKey) {
    return false;
  }
  return true;
}

async function handleCreateGame(request) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    const profileInfo = request.profileInfo;
    console.log(`Creating game using profile: ${profileInfo?.profile?.name || 'Default'}`);
    
    const dojoClient = getDojoClient(profileInfo?.config);
    const result = await dojoClient.createGame();

    const response = {
      success: true,
      message: 'Game created successfully',
      data: {
        transactionHash: result.transaction_hash,
        method: 'dojo-generated',
        profileUsed: profileInfo?.profile?.name || 'Default Configuration'
      },
      timestamp: new Date().toISOString()
    };

    if (profileInfo?.warning) {
      response.warning = profileInfo.warning;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Create game error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create game',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export const POST = createProfileAwareHandler(handleCreateGame);