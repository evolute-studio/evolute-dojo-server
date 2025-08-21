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

async function handleGetAccount(request) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    // Get profile config from middleware
    const profileInfo = request.profileInfo;
    const dojoClient = getDojoClient(profileInfo?.config);
    const accountInfo = await dojoClient.getAccountInfo();

    // Add profile info to response
    const response = {
      success: true,
      data: {
        ...accountInfo,
        profileUsed: profileInfo?.profile?.name || 'Default Configuration'
      },
      timestamp: new Date().toISOString()
    };

    if (profileInfo?.warning) {
      response.warning = profileInfo.warning;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Get account info error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to get account information',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export const GET = createProfileAwareHandler(handleGetAccount);