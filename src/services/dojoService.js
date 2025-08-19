import { Account, Provider } from 'starknet';
import { config } from '../config/environment.js';

// Simplified approach - try to bypass the problematic starknet.js behavior
async function executeTransactionSimplified(provider, account, contractAddress, functionName, calldata) {
  // Create the call object
  const call = {
    contractAddress,
    entrypoint: functionName,
    calldata: calldata || []
  };

  // Try to execute without fee estimation by skipping the problematic steps
  const result = await account.execute(call, undefined, { 
    skipValidate: true,
    maxFee: "0x0"
  });

  return result;
}

class DojoService {
  constructor() {
    this.provider = null;
    this.adminAccount = null;
    this.initialized = false;
  }

  async initialize() {
    try {
      // Initialize provider with nodeUrl (RPC) instead of sequencer
      this.provider = new Provider({
        nodeUrl: config.dojo.rpcUrl
      });

      // Initialize admin account
      this.adminAccount = new Account(
        this.provider,
        config.admin.address,
        config.admin.privateKey
      );

      // Test account connection
      try {
        const nonce = await this.adminAccount.getNonce();
        console.log(`Admin account nonce: ${nonce}`);
      } catch (error) {
        console.warn('Warning: Could not get account nonce:', error.message);
        // Continue initialization even if nonce check fails
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
      // Try simplified approach first
      console.log('Trying simplified execution...');
      
      const result = await executeTransactionSimplified(
        this.provider,
        this.adminAccount,
        contractAddress,
        functionName,
        calldata || []
      );

      console.log(`Transaction executed: ${result.transaction_hash}`);
      
      return {
        success: true,
        transactionHash: result.transaction_hash,
        contractAddress,
        functionName,
        calldata
      };
    } catch (error) {
      console.error('Direct transaction execution failed:', error);
      
      // Fallback to starknet.js with different approaches
      try {
        console.log('Trying starknet.js fallback...');
        
        const result = await this.adminAccount.execute([{
          contractAddress,
          entrypoint: functionName,
          calldata: calldata || []
        }]);

        return {
          success: true,
          transactionHash: result.transaction_hash,
          contractAddress,
          functionName,
          calldata
        };
      } catch (fallbackError) {
        console.error('Starknet.js fallback also failed:', fallbackError);
        throw new Error(`Both direct and starknet.js methods failed. Direct: ${error.message}, Fallback: ${fallbackError.message}`);
      }
    }
  }

  async getAccountInfo() {
    if (!this.initialized) {
      throw new Error('Dojo service not initialized');
    }

    try {
      const balance = await this.provider.getBalance(config.admin.address);
      const nonce = await this.adminAccount.getNonce();

      return {
        address: config.admin.address,
        balance: balance.toString(),
        nonce: nonce.toString()
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
      const result = await this.provider.callContract({
        contractAddress,
        entrypoint: functionName,
        calldata
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

export const dojoService = new DojoService();