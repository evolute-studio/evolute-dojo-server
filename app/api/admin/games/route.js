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

async function handleGetGames(request) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10000');
    const offset = parseInt(searchParams.get('offset') || '0');
    const activeOnly = searchParams.get('active') === 'true';

    const profileInfo = request.profileInfo;
    console.log(`Fetching games using profile: ${profileInfo?.profile?.name || 'Default'}`);
    
    const toriiClient = getToriiClient(profileInfo?.config);
    
    let result;
    if (activeOnly) {
      result = await toriiClient.getActiveGames();
    } else {
      result = await toriiClient.getGames(limit, offset);
    }

    // Group games by board_id and merge players
    const gamesByBoardId = new Map();
    
    result.games.forEach(game => {
      const boardId = toriiClient.formatBoardId(game.board_id);
      const boardIdKey = boardId || 'no-board';
      
      if (gamesByBoardId.has(boardIdKey)) {
        // Add player to existing game
        const existingGame = gamesByBoardId.get(boardIdKey);
        existingGame.players.push({
          address: game.player,
          formatted: toriiClient.formatAddress(game.player)
        });
      } else {
        // Create new game entry
        gamesByBoardId.set(boardIdKey, {
          status: game.status,
          gameMode: game.game_mode,
          boardId: boardId,
          boardIdRaw: game.board_id,
          players: [{
            address: game.player,
            formatted: toriiClient.formatAddress(game.player)
          }]
        });
      }
    });

    // Format grouped games for display
    const formattedGames = Array.from(gamesByBoardId.entries()).map(([boardIdKey, game], index) => ({
      id: index,
      // Primary player (first player) for compatibility
      player: game.players[0]?.formatted || 'N/A',
      playerFull: game.players[0]?.address || '',
      // All players in the game
      players: game.players,
      playersCount: game.players.length,
      // Game info
      status: toriiClient.formatGameStatus(game.status),
      statusRaw: game.status,
      gameMode: toriiClient.formatGameMode(game.gameMode),
      gameModeRaw: game.gameMode,
      boardId: game.boardId,
      boardIdRaw: game.boardIdRaw,
      // Add some derived fields for compatibility
      state: toriiClient.formatGameStatus(game.status),
      hostPlayer: game.players[0]?.formatted || 'N/A',
      hostPlayerFull: game.players[0]?.address || '',
      guestPlayer: game.players[1]?.formatted || null,
      guestPlayerFull: game.players[1]?.address || null
    }));

    const response = {
      success: true,
      data: {
        games: formattedGames,
        totalCount: result.totalCount,
        limit,
        offset,
        profileUsed: profileInfo?.profile?.name || 'Default Configuration'
      },
      timestamp: new Date().toISOString()
    };

    if (profileInfo?.warning) {
      response.warning = profileInfo.warning;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Get games error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch games',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export const GET = createProfileAwareHandler(handleGetGames);