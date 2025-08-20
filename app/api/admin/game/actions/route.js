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
      case 'cancel_game':
        result = await dojoClient.cancelGame();
        message = 'Game cancelled successfully';
        break;

      case 'skip_move':
        result = await dojoClient.skipMove();
        message = 'Move skipped successfully';
        break;

      case 'make_move':
        const { jokerTile, rotation, col, row } = params;
        if (rotation === undefined || col === undefined || row === undefined) {
          return NextResponse.json({
            success: false,
            error: 'rotation, col, and row are required for make_move'
          }, { status: 400 });
        }
        result = await dojoClient.makeMove(jokerTile || null, rotation, col, row);
        message = 'Move made successfully';
        break;

      case 'commit_tiles':
        const { commitments } = params;
        if (!commitments || !Array.isArray(commitments)) {
          return NextResponse.json({
            success: false,
            error: 'commitments array is required for commit_tiles'
          }, { status: 400 });
        }
        result = await dojoClient.commitTiles(commitments);
        message = 'Tiles committed successfully';
        break;

      case 'reveal_tile':
        const { tileIndex, nonce, c } = params;
        if (tileIndex === undefined || nonce === undefined || c === undefined) {
          return NextResponse.json({
            success: false,
            error: 'tileIndex, nonce, and c are required for reveal_tile'
          }, { status: 400 });
        }
        result = await dojoClient.revealTile(tileIndex, nonce, c);
        message = 'Tile revealed successfully';
        break;

      case 'request_next_tile':
        const { tileIndex: reqTileIndex, nonce: reqNonce, c: reqC } = params;
        if (reqTileIndex === undefined || reqNonce === undefined || reqC === undefined) {
          return NextResponse.json({
            success: false,
            error: 'tileIndex, nonce, and c are required for request_next_tile'
          }, { status: 400 });
        }
        result = await dojoClient.requestNextTile(reqTileIndex, reqNonce, reqC);
        message = 'Next tile requested successfully';
        break;

      case 'finish_game':
        const { boardId } = params;
        if (boardId === undefined) {
          return NextResponse.json({
            success: false,
            error: 'boardId is required for finish_game'
          }, { status: 400 });
        }
        result = await dojoClient.finishGame(boardId);
        message = 'Game finished successfully';
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
    console.error('Game action error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to execute game action',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}