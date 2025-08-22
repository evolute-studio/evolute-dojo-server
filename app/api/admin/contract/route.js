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

    // Initialize dojo client to get access to world contracts
    await dojoClient.initialize();

    switch (action) {
      // EVLT Token actions
      case 'mint':
        const { recipient: mintRecipient, amount: mintAmount } = params;
        if (!mintRecipient || !mintAmount) {
          return NextResponse.json({
            success: false,
            error: 'recipient and amount are required for mint action'
          }, { status: 400 });
        }
        result = await dojoClient.world.evlt_token.mint(dojoClient.adminAccount, mintRecipient, mintAmount);
        message = 'EVLT tokens minted successfully';
        break;

      case 'burn':
        const { from: burnFrom, amount: burnAmount } = params;
        if (!burnFrom || !burnAmount) {
          return NextResponse.json({
            success: false,
            error: 'from and amount are required for burn action'
          }, { status: 400 });
        }
        result = await dojoClient.world.evlt_token.burn(dojoClient.adminAccount, burnFrom, burnAmount);
        message = 'EVLT tokens burned successfully';
        break;

      case 'transfer':
        const { recipient: transferRecipient, amount: transferAmount } = params;
        if (!transferRecipient || !transferAmount) {
          return NextResponse.json({
            success: false,
            error: 'recipient and amount are required for transfer action'
          }, { status: 400 });
        }
        result = await dojoClient.world.evlt_token.transfer(dojoClient.adminAccount, transferRecipient, transferAmount);
        message = 'EVLT tokens transferred successfully';
        break;

      case 'set_minter':
        const { minter_address } = params;
        if (!minter_address) {
          return NextResponse.json({
            success: false,
            error: 'minter_address is required'
          }, { status: 400 });
        }
        result = await dojoClient.world.evlt_token.setMinter(dojoClient.adminAccount, minter_address);
        message = 'Minter set successfully';
        break;

      case 'balance_of':
        const { account: balanceAccount } = params;
        if (!balanceAccount) {
          return NextResponse.json({
            success: false,
            error: 'account is required for balance_of action'
          }, { status: 400 });
        }
        result = await dojoClient.world.evlt_token.balanceOf(balanceAccount);
        message = 'Balance retrieved successfully';
        break;

      // EVLT Topup actions
      case 'mint_evlt':
        const { user: evltUser, amount: evltAmount, source: evltSource } = params;
        if (!evltUser || !evltAmount || evltSource === undefined) {
          return NextResponse.json({
            success: false,
            error: 'user, amount and source are required for mint_evlt action'
          }, { status: 400 });
        }
        result = await dojoClient.world.evlt_topup.mintEvlt(dojoClient.adminAccount, evltUser, evltAmount, evltSource);
        message = 'EVLT minted successfully';
        break;

      case 'mint_evlt_batch':
        const { users: batchUsers, amounts: batchAmounts, source: batchSource } = params;
        if (!batchUsers || !batchAmounts || batchSource === undefined) {
          return NextResponse.json({
            success: false,
            error: 'users, amounts and source are required for mint_evlt_batch action'
          }, { status: 400 });
        }
        
        // Parse JSON arrays if they come as strings
        let parsedUsers, parsedAmounts;
        try {
          parsedUsers = typeof batchUsers === 'string' ? JSON.parse(batchUsers) : batchUsers;
          parsedAmounts = typeof batchAmounts === 'string' ? JSON.parse(batchAmounts) : batchAmounts;
        } catch (parseError) {
          return NextResponse.json({
            success: false,
            error: 'Invalid JSON format for users or amounts'
          }, { status: 400 });
        }
        
        if (!Array.isArray(parsedUsers) || !Array.isArray(parsedAmounts) || parsedUsers.length !== parsedAmounts.length) {
          return NextResponse.json({
            success: false,
            error: 'users and amounts must be arrays of the same length'
          }, { status: 400 });
        }
        
        result = await dojoClient.world.evlt_topup.mintEvltBatch(dojoClient.adminAccount, parsedUsers, parsedAmounts, batchSource);
        message = 'EVLT batch minted successfully';
        break;

      case 'grant_minter_role':
        const { account } = params;
        if (!account) {
          return NextResponse.json({
            success: false,
            error: 'account address is required'
          }, { status: 400 });
        }
        result = await dojoClient.world.evlt_topup.grantMinterRole(dojoClient.adminAccount, account);
        message = 'Minter role granted successfully';
        break;

      // GRND Token actions  
      case 'reward_player':
        const { player, amount: rewardAmount } = params;
        if (!player || !rewardAmount) {
          return NextResponse.json({
            success: false,
            error: 'player and amount are required for reward_player action'
          }, { status: 400 });
        }
        result = await dojoClient.world.grnd_token.rewardPlayer(dojoClient.adminAccount, player, rewardAmount);
        message = 'Player rewarded successfully';
        break;

      // Matchmaking actions
      case 'create_game':
        const { gameConfig } = params;
        // gameConfig is optional for matchmaking create_game
        result = await dojoClient.world.matchmaking.createGame(dojoClient.adminAccount, gameConfig || '');
        message = 'Game created successfully';
        break;

      case 'auto_match':
        const { playerId } = params;
        if (!playerId) {
          return NextResponse.json({
            success: false,
            error: 'playerId is required for auto_match action'
          }, { status: 400 });
        }
        result = await dojoClient.world.matchmaking.autoMatch(dojoClient.adminAccount, playerId);
        message = 'Auto match initiated successfully';
        break;

      case 'join_game':
        const { gameId, joinPlayerId } = params;
        if (!gameId || !joinPlayerId) {
          return NextResponse.json({
            success: false,
            error: 'gameId and playerId are required for join_game action'
          }, { status: 400 });
        }
        result = await dojoClient.world.matchmaking.joinGame(dojoClient.adminAccount, gameId, joinPlayerId);
        message = 'Joined game successfully';
        break;

      case 'cancel_game':
        const { cancelGameId } = params;
        if (!cancelGameId) {
          return NextResponse.json({
            success: false,
            error: 'gameId is required for cancel_game action'
          }, { status: 400 });
        }
        result = await dojoClient.world.matchmaking.cancelGame(dojoClient.adminAccount, cancelGameId);
        message = 'Game cancelled successfully';
        break;

      case 'admin_cancel_game':
        const { adminCancelGameId } = params;
        if (!adminCancelGameId) {
          return NextResponse.json({
            success: false,
            error: 'gameId is required for admin_cancel_game action'
          }, { status: 400 });
        }
        result = await dojoClient.world.matchmaking.adminCancelGame(dojoClient.adminAccount, adminCancelGameId);
        message = 'Game cancelled by admin successfully';
        break;

      // Tournament Token actions
      case 'enlist_duelist':
        const { duelist } = params;
        if (!duelist) {
          return NextResponse.json({
            success: false,
            error: 'duelist address is required'
          }, { status: 400 });
        }
        result = await dojoClient.world.tournament_token.enlistDuelist(dojoClient.adminAccount, duelist);
        message = 'Duelist enlisted successfully';
        break;

      case 'join_duel':
        const { duelId, duelPlayerId } = params;
        if (!duelId || !duelPlayerId) {
          return NextResponse.json({
            success: false,
            error: 'duelId and playerId are required for join_duel action'
          }, { status: 400 });
        }
        result = await dojoClient.world.tournament_token.joinDuel(dojoClient.adminAccount, duelId, duelPlayerId);
        message = 'Joined duel successfully';
        break;

      case 'start_tournament':
        const { tournamentId } = params;
        if (!tournamentId) {
          return NextResponse.json({
            success: false,
            error: 'tournamentId is required for start_tournament action'
          }, { status: 400 });
        }
        result = await dojoClient.world.tournament_token.startTournament(dojoClient.adminAccount, tournamentId);
        message = 'Tournament started successfully';
        break;

      case 'end_tournament':
        const { endTournamentId, winner } = params;
        if (!endTournamentId || !winner) {
          return NextResponse.json({
            success: false,
            error: 'tournamentId and winner are required for end_tournament action'
          }, { status: 400 });
        }
        result = await dojoClient.world.tournament_token.endTournament(dojoClient.adminAccount, endTournamentId, winner);
        message = 'Tournament ended successfully';
        break;

      default:
        return NextResponse.json({
          success: false,
          error: `Unknown action: ${action}`
        }, { status: 400 });
    }

    // Helper function to convert BigInt to string for JSON serialization
    const serializeResult = (obj) => {
      return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
    };

    return NextResponse.json({
      success: true,
      message,
      data: {
        action,
        // For read-only calls, include the actual result
        ...(result.transaction_hash ? 
          { transactionHash: result.transaction_hash, method: 'dojo-generated' } : 
          { result: serializeResult(result), method: 'dojo-call' }
        )
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Contract action error:', error);
    
    // Ensure error message is serializable
    let errorMessage = error.message || 'Failed to execute contract action';
    if (typeof errorMessage === 'object') {
      errorMessage = JSON.stringify(errorMessage, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}