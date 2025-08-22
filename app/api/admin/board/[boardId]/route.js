import { NextResponse } from 'next/server';
import { getToriiClient } from '../../../../lib/torii-client.js';
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

function determineWinner(blueScore, redScore, gameState) {
  if (gameState !== 'GameOver' && gameState !== 'Finished') {
    return null;
  }
  
  const blueTotal = blueScore?._1 || 0;
  const redTotal = redScore?._1 || 0;
  
  if (blueTotal > redTotal) {
    return 'Blue';
  } else if (redTotal > blueTotal) {
    return 'Red';
  } else {
    return 'Draw';
  }
}

async function handleGetBoard(request, { params }) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    const { boardId } = params;
    
    if (!boardId) {
      return NextResponse.json({
        success: false,
        error: 'Board ID is required'
      }, { status: 400 });
    }

    const profileInfo = request.profileInfo;
    console.log(`Fetching board ${boardId} using profile: ${profileInfo?.profile?.name || 'Default'}`);
    
    const toriiClient = getToriiClient(profileInfo?.config);
    const board = await toriiClient.getBoard(boardId);

    if (!board) {
      return NextResponse.json({
        success: false,
        error: 'Board not found'
      }, { status: 404 });
    }

    // Format board data for display
    const formattedBoard = {
      boardId: board.id,
      player1: {
        address: board.player1?._0 || null,
        side: board.player1?._1 || null,
        jokers: board.player1?._2 || 0
      },
      player2: {
        address: board.player2?._0 || null,
        side: board.player2?._1 || null,
        jokers: board.player2?._2 || 0
      },
      blueScore: {
        current: board.blue_score?._0 || 0,
        total: board.blue_score?._1 || 0
      },
      redScore: {
        current: board.red_score?._0 || 0,
        total: board.red_score?._1 || 0
      },
      gameState: board.game_state || 'Unknown',
      movesDone: board.moves_done || 0,
      // Additional computed fields
      isGameOver: board.game_state === 'GameOver' || board.game_state === 'Finished',
      winner: determineWinner(board.blue_score, board.red_score, board.game_state)
    };

    const response = {
      success: true,
      data: {
        board: formattedBoard,
        profileUsed: profileInfo?.profile?.name || 'Default Configuration'
      },
      timestamp: new Date().toISOString()
    };

    if (profileInfo?.warning) {
      response.warning = profileInfo.warning;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Get board error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch board',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export const GET = createProfileAwareHandler(handleGetBoard);