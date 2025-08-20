import { createDojoConfig } from '@dojoengine/core';
import { Account, RpcProvider } from 'starknet';
import { config } from '../config/environment.js';
import { manifest } from '../config/manifest.js';

class DojoService {
  constructor() {
    this.sdk = null;
    this.client = null;
    this.adminAccount = null;
    this.initialized = false;
  }

  async initialize() {
    try {
      console.log('Initializing Dojo service with Core...');
      
      // Create Dojo configuration
      const dojoConfig = createDojoConfig({
        manifest,
        rpcUrl: config.dojo.rpcUrl,
        toriiUrl: config.dojo.toriiUrl,
        relayUrl: config.dojo.relayUrl,
        worldAddress: config.dojo.worldAddress,
        masterAddress: config.admin.address,
        masterPrivateKey: config.admin.privateKey
      });

      console.log('Dojo config created:', {
        rpcUrl: dojoConfig.rpcUrl,
        toriiUrl: dojoConfig.toriiUrl,
        worldAddress: dojoConfig.worldAddress,
        masterAddress: dojoConfig.masterAddress
      });

      // Create admin account using RPC provider
      const provider = new RpcProvider({
        nodeUrl: config.dojo.rpcUrl
      });

      this.adminAccount = new Account(
        provider,
        config.admin.address,
        config.admin.privateKey
      );

      // Test account connection
      try {
        const nonce = await this.adminAccount.getNonce();
        console.log(`Admin account nonce: ${nonce}`);
      } catch (error) {
        console.warn('Warning: Could not get account nonce:', error.message);
      }

      this.initialized = true;
      console.log('Dojo service initialized successfully');
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Dojo service:', error);
      throw error;
    }
  }

  async executeTransaction(contractAddress, functionName, calldata = []) {
    if (!this.initialized) {
      throw new Error('Dojo service not initialized');
    }

    try {
      console.log(`Executing ${functionName} with Dojo SDK...`);
      console.log('Parameters:', { contractAddress, functionName, calldata });

      // Execute using direct account execution
      
      const call = {
        contractAddress,
        entrypoint: functionName,
        calldata: calldata || []
      };

      const result = await this.adminAccount.execute(call);

      console.log(`Transaction executed: ${result.transaction_hash}`);
      
      return {
        success: true,
        transactionHash: result.transaction_hash,
        contractAddress,
        functionName,
        calldata,
        method: 'account'
      };
    } catch (error) {
      console.error('Transaction execution failed:', error);
      throw error;
    }
  }

  async createGame() {
    return this.executeTransaction(
      '0x00914690e3286dd88f560530c1780d664cd8eef9711f6e7a3c27265529bf2795',
      'create_game',
      []
    );
  }

  async joinGame(gameId, playerId = null) {
    const calldata = [gameId];
    if (playerId) calldata.push(playerId);
    
    return this.executeTransaction(
      '0x00914690e3286dd88f560530c1780d664cd8eef9711f6e7a3c27265529bf2795',
      'join_game',
      calldata
    );
  }

  async getAccountInfo() {
    if (!this.initialized) {
      throw new Error('Dojo service not initialized');
    }

    try {
      const nonce = await this.adminAccount.getNonce();

      return {
        address: config.admin.address,
        nonce: nonce.toString(),
        worldAddress: config.dojo.worldAddress
      };
    } catch (error) {
      console.error('Failed to get account info:', error);
      throw error;
    }
  }

  async callContract(contractAddress, functionName, calldata = []) {
    if (!this.initialized) {
      throw new Error('Dojo service not initialized');
    }

    try {
      // Use admin account provider for read calls
      const result = await this.adminAccount.callContract({
        contractAddress,
        entrypoint: functionName,
        calldata: calldata || []
      });

      return {
        success: true,
        result: result.result,
        contractAddress,
        functionName,
        calldata
      };
    } catch (error) {
      console.error('Contract call failed:', error);
      throw error;
    }
  }

  // Additional utility methods
  async getWorldInfo() {
    if (!this.initialized) {
      throw new Error('Dojo service not initialized');
    }

    return {
      worldAddress: config.dojo.worldAddress,
      rpcUrl: config.dojo.rpcUrl,
      toriiUrl: config.dojo.toriiUrl,
      masterAddress: config.admin.address
    };
  }

  async getGameState(gameId) {
    try {
      // Use Torii client to query game state if available
      if (this.client && this.client.getEntity) {
        return await this.client.getEntity('Game', gameId);
      }
      
      // Fallback to contract call
      return this.callContract(
        '0x00914690e3286dd88f560530c1780d664cd8eef9711f6e7a3c27265529bf2795',
        'get_game_state',
        [gameId]
      );
    } catch (error) {
      console.error('Failed to get game state:', error);
      throw error;
    }
  }
}

export const dojoService = new DojoService();