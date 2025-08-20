import { DojoProvider, createDojoConfig } from '@dojoengine/core';
import { Account, RpcProvider } from 'starknet';
import { config } from './dojo-config.js';
import realManifest from '../../src/config/manifest_testing.json';
import { setupWorld } from '../../src/dojo/contracts.gen.ts';

class DojoClient {
  constructor() {
    this.provider = null;
    this.dojoProvider = null;
    this.world = null;
    this.adminAccount = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return true;

    try {
      // Validate required config
      if (!config.admin.address || !config.admin.privateKey) {
        throw new Error('Admin address and private key are required');
      }
      if (!config.dojo.worldAddress || !config.dojo.rpcUrl) {
        throw new Error('Dojo world address and RPC URL are required');
      }

      console.log('Initializing with config:', {
        adminAddress: config.admin.address,
        worldAddress: config.dojo.worldAddress,
        rpcUrl: config.dojo.rpcUrl
      });

      // Create RPC provider
      this.provider = new RpcProvider({
        nodeUrl: config.dojo.rpcUrl
      });

      // Create admin account first
      this.adminAccount = new Account(
        this.provider,
        config.admin.address,
        config.admin.privateKey
      );

      // Use createDojoConfig з справжнім manifest
      const dojoConfig = createDojoConfig({
        rpcUrl: config.dojo.rpcUrl,
        toriiUrl: config.dojo.toriiUrl,
        worldAddress: config.dojo.worldAddress,
        manifest: realManifest
      });

      console.log('DojoConfig created:', JSON.stringify(dojoConfig, null, 2));

      // Initialize Dojo provider - fail if it doesn't work
      console.log('🔧 Creating DojoProvider with config:', {
        hasManifest: !!dojoConfig.manifest,
        hasWorld: !!dojoConfig.manifest?.world,
        worldAddress: dojoConfig.manifest?.world?.address,
        hasRpcUrl: !!dojoConfig.rpcUrl,
        hasToriiUrl: !!dojoConfig.toriiUrl
      });
      
      console.log('📋 Full manifest check:', JSON.stringify(dojoConfig.manifest?.world, null, 2));
      
      // DojoProvider конструктор: (manifest, url, logLevel)
      this.dojoProvider = new DojoProvider(
        dojoConfig.manifest, 
        dojoConfig.rpcUrl, 
        "error"
      );
      console.log('✅ DojoProvider created successfully - REAL TRANSACTIONS ENABLED');
      this.isRealTransactions = true;

      // Setup world with generated contracts
      this.world = setupWorld(this.dojoProvider);
      console.log('World setup complete, methods available:', {
        game: Object.keys(this.world.game || {}),
        player_profile_actions: Object.keys(this.world.player_profile_actions || {}),
        account_migration: Object.keys(this.world.account_migration || {}),
        tutorial: Object.keys(this.world.tutorial || {})
      });

      this.initialized = true;
      console.log('Dojo client initialized with generated contracts');
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Dojo client:', error);
      throw error;
    }
  }

  // Game actions using generated contracts
  async createGame() {
    await this.initialize();
    console.log('World structure:', Object.keys(this.world));
    console.log('Game methods:', Object.keys(this.world.game || {}));
    return await this.world.game.createGame(this.adminAccount);
  }

  async joinGame(hostPlayer) {
    await this.initialize();
    return await this.world.game.joinGame(this.adminAccount, hostPlayer);
  }

  async cancelGame() {
    await this.initialize();
    return await this.world.game.cancelGame(this.adminAccount);
  }

  async makeMove(jokerTile, rotation, col, row) {
    await this.initialize();
    return await this.world.game.makeMove(this.adminAccount, jokerTile, rotation, col, row);
  }

  async skipMove() {
    await this.initialize();
    return await this.world.game.skipMove(this.adminAccount);
  }

  async commitTiles(commitments) {
    await this.initialize();
    return await this.world.game.commitTiles(this.adminAccount, commitments);
  }

  async revealTile(tileIndex, nonce, c) {
    await this.initialize();
    return await this.world.game.revealTile(this.adminAccount, tileIndex, nonce, c);
  }

  async requestNextTile(tileIndex, nonce, c) {
    await this.initialize();
    return await this.world.game.requestNextTile(this.adminAccount, tileIndex, nonce, c);
  }

  async finishGame(boardId) {
    await this.initialize();
    return await this.world.game.finishGame(this.adminAccount, boardId);
  }

  // Tutorial actions
  async createTutorialGame(botAddress) {
    await this.initialize();
    return await this.world.tutorial.createTutorialGame(this.adminAccount, botAddress);
  }

  // Player profile actions
  async setPlayer(playerId, username, balance, gamesPlayed, activeSkin, role) {
    await this.initialize();
    return await this.world.player_profile_actions.setPlayer(
      this.adminAccount, playerId, username, balance, gamesPlayed, activeSkin, role
    );
  }

  async changeUsername(newUsername) {
    await this.initialize();
    return await this.world.player_profile_actions.changeUsername(this.adminAccount, newUsername);
  }

  async changeSkin(skinId) {
    await this.initialize();
    return await this.world.player_profile_actions.changeSkin(this.adminAccount, skinId);
  }

  async becomeBot() {
    await this.initialize();
    return await this.world.player_profile_actions.becomeBot(this.adminAccount);
  }

  async becomeController() {
    await this.initialize();
    return await this.world.player_profile_actions.becomeController(this.adminAccount);
  }

  // Account migration actions
  async initiateMigration(targetController) {
    await this.initialize();
    return await this.world.account_migration.initiateMigration(this.adminAccount, targetController);
  }

  async confirmMigration(guestAddress) {
    await this.initialize();
    return await this.world.account_migration.confirmMigration(this.adminAccount, guestAddress);
  }

  async cancelMigration() {
    await this.initialize();
    return await this.world.account_migration.cancelMigration(this.adminAccount);
  }

  async executeMigration(guestAddress) {
    await this.initialize();
    return await this.world.account_migration.executeMigration(this.adminAccount, guestAddress);
  }

  // Get account info
  async getAccountInfo() {
    await this.initialize();
    
    try {
      const nonce = await this.adminAccount.getNonce();
      return {
        address: config.admin.address,
        nonce: nonce.toString(),
        worldAddress: config.dojo.worldAddress,
        rpcUrl: config.dojo.rpcUrl,
        hasWorld: !!this.world,
        isRealTransactions: this.isRealTransactions || false,
        transactionMode: this.isRealTransactions ? "REAL BLOCKCHAIN" : "MOCK/SIMULATION"
      };
    } catch (error) {
      console.error('Failed to get account info:', error);
      throw error;
    }
  }

  // Health check
  isHealthy() {
    return this.initialized && this.world && this.adminAccount;
  }
}

// Singleton instance for server-side usage
let dojoClientInstance = null;

export function getDojoClient() {
  if (!dojoClientInstance) {
    dojoClientInstance = new DojoClient();
  }
  return dojoClientInstance;
}

export { DojoClient };