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

export async function GET(request) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    const dojoClient = getDojoClient();
    const accountInfo = await dojoClient.getAccountInfo();

    return NextResponse.json({
      success: true,
      data: accountInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get account info error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to get account information',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}