import { dojoService } from '../services/dojoService.js';

export class GameController {
  static async createGame(req, res) {
    try {
      const { contractAddress } = req.body;

      if (!contractAddress) {
        return res.status(400).json({
          success: false,
          error: 'Contract address is required'
        });
      }

      const result = await dojoService.executeTransaction(
        contractAddress,
        'create_game',
        [] // Порожній calldata як у Unity
      );

      res.json({
        success: true,
        message: 'Game created successfully',
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Create game error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to create game',
        timestamp: new Date().toISOString()
      });
    }
  }

  static async joinGame(req, res) {
    try {
      const { contractAddress, gameId, playerId } = req.body;

      if (!contractAddress || gameId === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Contract address and gameId are required'
        });
      }

      const calldata = [];
      if (gameId !== undefined) calldata.push(gameId.toString());
      if (playerId !== undefined) calldata.push(playerId.toString());

      const result = await dojoService.executeTransaction(
        contractAddress,
        'join_game',
        calldata
      );

      res.json({
        success: true,
        message: 'Joined game successfully',
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Join game error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to join game',
        timestamp: new Date().toISOString()
      });
    }
  }

  static async getGameState(req, res) {
    try {
      const { contractAddress, gameId } = req.query;

      if (!contractAddress || gameId === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Contract address and gameId are required'
        });
      }

      const result = await dojoService.callContract(
        contractAddress,
        'get_game_state',
        [gameId.toString()]
      );

      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Get game state error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to get game state',
        timestamp: new Date().toISOString()
      });
    }
  }
}