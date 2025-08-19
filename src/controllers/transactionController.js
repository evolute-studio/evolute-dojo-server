import { dojoService } from '../services/dojoService.js';

export class TransactionController {
  static async executeTransaction(req, res) {
    try {
      const { contractAddress, functionName, calldata = [] } = req.body;

      const result = await dojoService.executeTransaction(
        contractAddress,
        functionName,
        calldata
      );

      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Transaction execution error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to execute transaction',
        timestamp: new Date().toISOString()
      });
    }
  }

  static async callContract(req, res) {
    try {
      const { contractAddress, functionName, calldata = [] } = req.body;

      const result = await dojoService.callContract(
        contractAddress,
        functionName,
        calldata
      );

      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Contract call error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to call contract',
        timestamp: new Date().toISOString()
      });
    }
  }

  static async getAccountInfo(req, res) {
    try {
      const accountInfo = await dojoService.getAccountInfo();

      res.json({
        success: true,
        data: accountInfo,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Get account info error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to get account information',
        timestamp: new Date().toISOString()
      });
    }
  }

  static async healthCheck(req, res) {
    try {
      const isInitialized = dojoService.initialized;
      
      res.json({
        success: true,
        data: {
          status: 'healthy',
          dojoInitialized: isInitialized,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      });
    }
  }
}