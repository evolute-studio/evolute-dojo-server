import { createDynamicConfig } from './dojo-config.js';

class ToriiClient {
  constructor(profileConfig = null) {
    this.toriiUrl = null;
    this.profileConfig = profileConfig;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    const dynamicConfig = this.profileConfig || await createDynamicConfig();
    this.toriiUrl = dynamicConfig.dojo.toriiUrl;
    this.initialized = true;
  }

  async query(query, variables = {}) {
    await this.initialize();

    if (!this.toriiUrl) {
      throw new Error('Torii URL not configured');
    }

    try {
      const response = await fetch(`${this.toriiUrl}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`Torii query failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(`GraphQL errors: ${data.errors.map(e => e.message).join(', ')}`);
      }

      return data.data;
    } catch (error) {
      console.error('Torii query error:', error);
      throw error;
    }
  }

  async getGames(limit = 10000, offset = 0) {
    const query = `
      query GetGames($limit: Int) {
        evoluteDuelGameModels(limit: $limit) {
          edges {
            node {
              player
              status
              board_id {
                Some
                option
              }
              game_mode
            }
          }
        }
      }
    `;

    try {
      const data = await this.query(query, { limit });
      console.log('🔍 Torii games query result:', data);
      
      return {
        games: data.evoluteDuelGameModels.edges.map(edge => edge.node),
        totalCount: data.evoluteDuelGameModels.edges.length
      };
    } catch (error) {
      console.error('❌ Torii games query failed:', error.message);
      
      // Fallback: try a simple introspection query to test connection
      const fallbackQuery = `
        query {
          __schema {
            queryType {
              name
            }
          }
        }
      `;
      
      try {
        const fallbackData = await this.query(fallbackQuery);
        console.log('✅ Torii connection working, but games query failed:', fallbackData);
        throw new Error(`Games query failed: ${error.message}. Torii connected but evoluteDuelGameModels might not exist.`);
      } catch (fallbackError) {
        throw new Error(`Torii connection failed: ${fallbackError.message}`);
      }
    }
  }

  async getGamesByPlayer(playerAddress) {
    const query = `
      query GetGamesByPlayer($playerAddress: String!) {
        evoluteDuelGameModels(
          limit: 10000
          where: { player: { eq: $playerAddress } }
        ) {
          edges {
            node {
              player
              status
              board_id {
                Some
                option
              }
              game_mode
            }
          }
        }
      }
    `;

    try {
      const data = await this.query(query, { playerAddress });
      return {
        games: data.evoluteDuelGameModels.edges.map(edge => edge.node),
        totalCount: data.evoluteDuelGameModels.edges.length
      };
    } catch (error) {
      console.error('❌ Torii games by player query failed:', error.message);
      throw error;
    }
  }

  async getActiveGames() {
    const query = `
      query GetActiveGames {
        evoluteDuelGameModels(limit: 10000) {
          edges {
            node {
              player
              status
              board_id {
                Some
                option
              }
              game_mode
            }
          }
        }
      }
    `;

    try {
      const data = await this.query(query);
      console.log('🔍 Torii active games query result:', data);
      
      // Filter for active games (Created, InProgress)
      const allGames = data.evoluteDuelGameModels.edges.map(edge => edge.node);
      const activeGames = allGames.filter(game => 
        game.status === "Created" || game.status === "InProgress"
      );

      return {
        games: activeGames,
        totalCount: activeGames.length
      };
    } catch (error) {
      console.error('❌ Torii active games query failed:', error.message);
      throw error;
    }
  }


  formatGameStatus(status) {
    const statusMap = {
      'Finished': 'Finished',
      'Created': 'Waiting for player',
      'Canceled': 'Canceled', 
      'InProgress': 'In progress'
    };
    return statusMap[status] || status || 'Unknown';
  }

  formatGameMode(gameMode) {
    const modeMap = {
      'None': 'None',
      'Tutorial': 'Tutorial',
      'Ranked': 'Ranked',
      'Casual': 'Casual'
    };
    return modeMap[gameMode] || gameMode || 'None';
  }

  formatBoardId(boardId) {
    if (!boardId) return null;
    if (boardId.Some !== undefined) {
      return boardId.Some;
    }
    if (boardId.option !== undefined) {
      return boardId.option;
    }
    return boardId;
  }

  formatAddress(address) {
    if (!address || address === "0x0") return "N/A";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

}

// Singleton instance for server-side usage
let toriiClientInstance = null;

export function getToriiClient(profileConfig = null) {
  // If profile config provided, create new instance
  if (profileConfig) {
    return new ToriiClient(profileConfig);
  }
  
  // Otherwise use singleton
  if (!toriiClientInstance) {
    toriiClientInstance = new ToriiClient();
  }
  return toriiClientInstance;
}

export { ToriiClient };