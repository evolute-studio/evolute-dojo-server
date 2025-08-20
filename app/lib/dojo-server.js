import { Account, RpcProvider } from 'starknet';
import { config, validateEnvironment } from './dojo-config.js';

class DojoServerService {
  constructor() {
    this.adminAccount = null;
    this.provider = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return true;

    try {
      // Validate environment
      validateEnvironment();

      // Create RPC provider
      this.provider = new RpcProvider({
        nodeUrl: config.dojo.rpcUrl
      });

      // Create admin account
      this.adminAccount = new Account(
        this.provider,
        config.admin.address,
        config.admin.privateKey
      );

      // Test connection
      try {
        const nonce = await this.adminAccount.getNonce();
        console.log(`Admin account nonce: ${nonce}`);
      } catch (error) {
        console.warn('Warning: Could not get account nonce:', error.message);
      }

      this.initialized = true;
      console.log('Dojo server service initialized successfully');
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Dojo server service:', error);
      throw error;
    }
  }

  async executeTransaction(contractAddress, functionName, calldata = []) {
    await this.initialize();

    try {
      const call = {
        contractAddress,
        entrypoint: functionName,
        calldata: calldata || []
      };

      const result = await this.adminAccount.execute(call);

      return {
        success: true,
        transactionHash: result.transaction_hash,
        contractAddress,
        functionName,
        calldata
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
    await this.initialize();

    try {
      const nonce = await this.adminAccount.getNonce();

      return {
        address: config.admin.address,
        nonce: nonce.toString(),
        worldAddress: config.dojo.worldAddress,
        rpcUrl: config.dojo.rpcUrl
      };
    } catch (error) {
      console.error('Failed to get account info:', error);
      throw error;
    }
  }

  async callContract(contractAddress, functionName, calldata = []) {
    await this.initialize();

    try {
      const result = await this.provider.callContract({
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
}

// Singleton instance for server-side usage
let dojoServerInstance = null;

export function getDojoServer() {
  if (!dojoServerInstance) {
    dojoServerInstance = new DojoServerService();
  }
  return dojoServerInstance;
}