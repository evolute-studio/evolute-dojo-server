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
    const body = await request.json();
    const { hostPlayer } = body;

    if (!hostPlayer) {
      return NextResponse.json({
        success: false,
        error: 'Host player address is required'
      }, { status: 400 });
    }

    const dojoClient = getDojoClient();
    const result = await dojoClient.joinGame(hostPlayer);

    return NextResponse.json({
      success: true,
      message: 'Joined game successfully',
      data: {
        transactionHash: result.transaction_hash,
        hostPlayer,
        method: 'dojo-generated'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Join game error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to join game',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}