import { NextResponse } from 'next/server';
import { getDojoClient } from '../../../lib/dojo-client.js';
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

async function handleChangeProfile(request) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    const { username } = await request.json();
    
    if (!username) {
      return NextResponse.json({
        success: false,
        error: 'Username is required'
      }, { status: 400 });
    }

    const profileInfo = request.profileInfo;
    console.log(`Changing username to: ${username} using profile: ${profileInfo?.profile?.name || 'Default'}`);
    
    const dojoClient = getDojoClient(profileInfo?.config);
    const result = await dojoClient.changeUsername(username);
    
    console.log('✅ Username changed successfully! Transaction hash:', result.transaction_hash);

    const response = {
      success: true,
      message: 'Username changed successfully',
      transactionHash: result.transaction_hash,
      data: {
        username: username,
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
    console.error('Change username error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to change username',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export const POST = createProfileAwareHandler(handleChangeProfile);