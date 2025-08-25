import { NextResponse } from 'next/server';
import { getDojoClient } from '../../../lib/dojo-client.js';
import { config } from '../../../lib/dojo-config.js';
import { createProfileAwareHandler } from '../../../lib/profileMiddleware.js';
import { CairoOption, CairoOptionVariant } from 'starknet';

// Centralized authentication
function authenticateApiKey(request) {
  const apiKey = request.headers.get('x-api-key') || 
                 request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!apiKey || apiKey !== config.security.apiSecretKey) {
    return false;
  }
  return true;
}

// Helper function to serialize BigInt values
const serializeResult = (obj) => {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
};

// Contract method mapping - centralized contract actions configuration
const CONTRACT_METHODS = {
  // Game Contract - uses generated contract methods
  game: {
    commit_tiles: {
      method: 'commitTiles',
      params: ['commitments'],
      description: 'Commit tile commitments'
    },
    finish_game: {
      method: 'finishGame',
      params: ['boardId'],
      description: 'Complete the game'
    },
    make_move: {
      method: 'makeMove',
      params: ['jokerTile', 'rotation', 'col', 'row'],
      description: 'Execute game move'
    },
    request_next_tile: {
      method: 'requestNextTile',
      params: ['tileIndex', 'nonce', 'c'],
      description: 'Request next tile with reveal'
    },
    reveal_tile: {
      method: 'revealTile',
      params: ['tileIndex', 'nonce', 'c'],
      description: 'Reveal a committed tile'
    },
    skip_move: {
      method: 'skipMove',
      params: [],
      description: 'Skip current turn'
    }
  },

  // Player Contract - uses player_profile_actions contract
  player: {
    set_player: {
      method: 'setPlayer',
      params: ['playerId', 'username', 'balance', 'gamesPlayed', 'activeSkin', 'role'],
      description: 'Set complete player profile',
      contractName: 'player_profile_actions'
    },
    change_username: {
      method: 'changeUsername',
      params: ['newUsername'],
      description: 'Update player username',
      contractName: 'player_profile_actions'
    },
    change_skin: {
      method: 'changeSkin',
      params: ['skinId'],
      description: 'Update player skin',
      contractName: 'player_profile_actions'
    },
    become_bot: {
      method: 'becomeBot',
      params: [],
      description: 'Switch player to bot mode',
      contractName: 'player_profile_actions'
    },
    become_controller: {
      method: 'becomeController',
      params: [],
      description: 'Switch player to controller mode',
      contractName: 'player_profile_actions'
    }
  },

  // EVLT Token Contract
  evlt_token: {
    mint: {
      method: 'mint',
      params: ['recipient', 'amount'],
      description: 'Mint EVLT tokens'
    },
    burn: {
      method: 'burn',
      params: ['from', 'amount'],
      description: 'Burn EVLT tokens'
    },
    transfer: {
      method: 'transfer',
      params: ['recipient', 'amount'],
      description: 'Transfer EVLT tokens'
    },
    set_minter: {
      method: 'setMinter',
      params: ['minter_address'],
      description: 'Set minter address'
    },
    balance_of: {
      method: 'balanceOf',
      params: ['account'],
      description: 'Get token balance',
      isQuery: true
    }
  },

  // EVLT Topup Contract
  evlt_topup: {
    mint_evlt: {
      method: 'mintEvlt',
      params: ['user', 'amount', 'source'],
      description: 'Mint EVLT with source tracking'
    },
    mint_evlt_batch: {
      method: 'mintEvltBatch',
      params: ['users', 'amounts', 'source'],
      description: 'Batch mint EVLT tokens'
    },
    grant_minter_role: {
      method: 'grantMinterRole',
      params: ['account'],
      description: 'Grant minter role'
    }
  },

  // GRND Token Contract
  grnd_token: {
    mint: {
      method: 'mint',
      params: ['recipient', 'amount'],
      description: 'Mint GRND tokens'
    },
    burn: {
      method: 'burn',
      params: ['from', 'amount'],
      description: 'Burn GRND tokens'
    },
    reward_player: {
      method: 'rewardPlayer',
      params: ['player_address', 'amount'],
      description: 'Reward player with GRND'
    },
    set_minter: {
      method: 'setMinter',
      params: ['minter_address'],
      description: 'Set GRND minter'
    }
  },

  // Matchmaking Contract
  matchmaking: {
    create_game: {
      method: 'createGame',
      params: ['game_mode', 'opponent'],
      description: 'Create matchmaking game'
    },
    auto_match: {
      method: 'autoMatch',
      params: ['game_mode', 'tournament_id'],
      description: 'Find automatic match'
    },
    join_game: {
      method: 'joinGame',
      params: ['host_player'],
      description: 'Join existing game'
    },
    cancel_game: {
      method: 'cancelGame',
      params: [],
      description: 'Cancel current game'
    },
    admin_cancel_game: {
      method: 'adminCancelGame',
      params: ['player_address'],
      description: 'Admin cancel player game'
    }
  },

  // Tournament Token Contract
  tournament_token: {
    mint: {
      method: 'mint',
      params: ['player_name', 'settings_id', 'start', 'end', 'to'],
      description: 'Mint tournament pass'
    },
    enlist_duelist: {
      method: 'enlistDuelist',
      params: ['pass_id'],
      description: 'Enlist in tournament'
    },
    join_duel: {
      method: 'joinDuel',
      params: ['pass_id'],
      description: 'Join tournament duel'
    },
    start_tournament: {
      method: 'startTournament',
      params: ['pass_id'],
      description: 'Start tournament'
    },
    end_tournament: {
      method: 'endTournament',
      params: ['pass_id'],
      description: 'End tournament'
    }
  },

  // Tutorial Contract
  tutorial: {
    create_tutorial_game: {
      method: 'createTutorialGame',
      params: [],
      description: 'Create tutorial game'
    },
    make_move: {
      method: 'makeMove',
      params: ['jokerTile', 'rotation', 'col', 'row'],
      description: 'Make tutorial move'
    },
    skip_move: {
      method: 'skipMove',
      params: [],
      description: 'Skip tutorial turn'
    }
  },

  // Account Migration Contract
  account_migration: {
    initiate_migration: {
      method: 'initiateMigration',
      params: ['target_controller'],
      description: 'Start account migration'
    },
    confirm_migration: {
      method: 'confirmMigration',
      params: ['guest_address'],
      description: 'Confirm migration'
    },
    cancel_migration: {
      method: 'cancelMigration',
      params: [],
      description: 'Cancel migration'
    },
    execute_migration: {
      method: 'executeMigration',
      params: ['guest_address'],
      description: 'Execute migration'
    },
    emergency_cancel_migration: {
      method: 'emergencyCancelMigration',
      params: ['guest_address'],
      description: 'Emergency cancel migration'
    }
  }
};

// Main transaction handler
async function handleTransaction(request) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, contract, ...params } = body;

    // Validate required fields
    if (!action) {
      return NextResponse.json({
        success: false,
        error: 'Action is required'
      }, { status: 400 });
    }

    // Auto-detect contract from action if not provided
    let targetContract = contract;
    let contractMethod = null;

    if (!targetContract) {
      // Try to find contract by action
      for (const [contractName, actions] of Object.entries(CONTRACT_METHODS)) {
        if (actions[action]) {
          targetContract = contractName;
          contractMethod = actions[action];
          break;
        }
      }
    } else {
      contractMethod = CONTRACT_METHODS[targetContract]?.[action];
    }

    if (!targetContract || !contractMethod) {
      return NextResponse.json({
        success: false,
        error: `Unknown action '${action}' for contract '${targetContract || 'auto-detect'}'`
      }, { status: 400 });
    }

    // Get profile info from middleware
    const profileInfo = request.profileInfo;
    console.log(`Executing ${targetContract}.${action} using profile: ${profileInfo?.profile?.name || 'Default'}`);

    // Initialize Dojo client
    const dojoClient = getDojoClient(profileInfo?.config);
    await dojoClient.initialize();

    // Validate required parameters
    const requiredParams = contractMethod.params || [];
    for (const paramName of requiredParams) {
      if (params[paramName] === undefined || params[paramName] === null || params[paramName] === '') {
        // Skip validation for optional parameters (those with default values or marked as optional)
        const isOptional = paramName.includes('optional') || 
                          paramName === 'joker_tile' || 
                          paramName === 'jokerTile' ||
                          paramName === 'opponent' ||
                          paramName === 'tournament_id' ||
                          paramName === 'start' ||
                          paramName === 'end';
        
        if (!isOptional) {
          return NextResponse.json({
            success: false,
            error: `Parameter '${paramName}' is required for action '${action}'`
          }, { status: 400 });
        }
      }
    }

    // Prepare method arguments
    const methodArgs = requiredParams.map(paramName => {
      let value = params[paramName];
      
      // Handle special parameter processing
      if (paramName === 'users' || paramName === 'amounts') {
        // Parse JSON arrays if they come as strings
        try {
          value = typeof value === 'string' ? JSON.parse(value) : value;
        } catch (parseError) {
          throw new Error(`Invalid JSON format for parameter '${paramName}'`);
        }
      }
      
      // Handle CairoOption parameters - use proper CairoOptionVariant
      if (paramName === 'opponent' || paramName === 'tournament_id' || paramName === 'jokerTile' || 
          paramName === 'start' || paramName === 'end') {
        if (!value || value === '') {
          // CairoOption None
          return new CairoOption(CairoOptionVariant.None);
        } else {
          // CairoOption Some(value)
          return new CairoOption(CairoOptionVariant.Some, value);
        }
      }
      
      return value;
    });

    // Get the actual contract name (some actions use different contract names)
    const actualContractName = contractMethod.contractName || targetContract;
    
    // Execute the contract method
    const contractInstance = dojoClient.world[actualContractName];
    if (!contractInstance) {
      return NextResponse.json({
        success: false,
        error: `Contract '${actualContractName}' not found in Dojo world`
      }, { status: 400 });
    }

    const method = contractInstance[contractMethod.method];
    if (!method || typeof method !== 'function') {
      return NextResponse.json({
        success: false,
        error: `Method '${contractMethod.method}' not found in contract '${actualContractName}'`
      }, { status: 400 });
    }

    // Execute the method
    let result;
    if (contractMethod.useDirectClient) {
      // Use dojoClient methods directly (for game contract)
      const directMethod = dojoClient[contractMethod.method];
      if (!directMethod || typeof directMethod !== 'function') {
        return NextResponse.json({
          success: false,
          error: `Method '${contractMethod.method}' not found in dojoClient`
        }, { status: 400 });
      }
      result = contractMethod.isQuery ? 
        await directMethod(...methodArgs) : 
        await directMethod(...methodArgs);
    } else {
      // Use dojoClient.world.contract.method pattern
      if (contractMethod.isQuery) {
        // For read-only queries, don't pass admin account
        result = await method(...methodArgs);
      } else {
        // For transactions, pass admin account as first parameter
        result = await method(dojoClient.adminAccount, ...methodArgs);
      }
    }

    // Prepare response
    const response = {
      success: true,
      message: `${contractMethod.description} completed successfully`,
      data: {
        action,
        contract: targetContract,
        method: contractMethod.method,
        profileUsed: profileInfo?.profile?.name || 'Default Configuration',
        // For transactions, include transaction hash
        ...(result?.transaction_hash ? 
          { transactionHash: result.transaction_hash, executionType: 'transaction' } : 
          { result: serializeResult(result), executionType: 'query' }
        )
      },
      timestamp: new Date().toISOString()
    };

    // Add profile warning if exists
    if (profileInfo?.warning) {
      response.warning = profileInfo.warning;
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Transaction execution error:', error);
    
    // Ensure error message is serializable
    let errorMessage = error.message || 'Failed to execute transaction';
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

// Export with profile middleware support
export const POST = createProfileAwareHandler(handleTransaction);

// Export GET for API documentation/health check
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Unified Transaction API',
    contracts: Object.keys(CONTRACT_METHODS),
    totalActions: Object.values(CONTRACT_METHODS).reduce((total, actions) => total + Object.keys(actions).length, 0),
    documentation: {
      endpoint: '/api/admin/transaction',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'required'
      },
      body: {
        action: 'required - action name (e.g., create_game)',
        contract: 'optional - contract name (auto-detected if not provided)',
        profile: 'optional - profile ID to use',
        '...params': 'action-specific parameters'
      },
      examples: [
        {
          description: 'Create a game',
          body: { action: 'create_game' }
        },
        {
          description: 'Check EVLT balance',
          body: { action: 'balance_of', account: '0x...' }
        },
        {
          description: 'Mint EVLT tokens',
          body: { action: 'mint_evlt', user: '0x...', amount: '100', source: 1 }
        }
      ]
    }
  });
}