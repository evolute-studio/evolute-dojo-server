import { NextResponse } from 'next/server';
import { getDojoClient } from '../../../../lib/dojo-client.js';
import { config } from '../../../../lib/dojo-config.js';

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
    console.log('Creating game...');
    const dojoClient = getDojoClient();
    const result = await dojoClient.createGame();

    return NextResponse.json({
      success: true,
      message: 'Game created successfully',
      data: {
        transactionHash: result.transaction_hash,
        method: 'dojo-generated'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Create game error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create game',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}