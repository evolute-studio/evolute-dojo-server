import { createDojoConfig } from '@dojoengine/core';

// Default manifest for Evolute Dojo game
export const manifest = {
  "world": {
    "kind": "WorldContract",
    "class_hash": "0x0230035e44105bbc11acf2dd1b271a78d53627a810e6a2fb024fd2edcf273c9c",
    "original_class_hash": "0x0230035e44105bbc11acf2dd1b271a78d53627a810e6a2fb024fd2edcf273c9c",
    "abi": [],
    "address": "0x0230035e44105bbc11acf2dd1b271a78d53627a810e6a2fb024fd2edcf273c9c",
    "transaction_hash": "0x",
    "block_number": null,
    "seed": "evolute-duel",
    "metadata": {
      "profile_name": "dev",
      "rpc_url": "https://api.cartridge.gg/x/dev-evolute-duel/katana"
    }
  },
  "contracts": [
    {
      "kind": "DojoContract", 
      "address": "0x00914690e3286dd88f560530c1780d664cd8eef9711f6e7a3c27265529bf2795",
      "class_hash": "0x",
      "original_class_hash": "0x",
      "base_class_hash": "0x",
      "abi": [],
      "reads": [],
      "writes": [],
      "computed": [],
      "name": "GameContract",
      "namespace": "evolute",
      "tag": "evolute-GameContract",
      "systems": [
        "create_game",
        "join_game",
        "submit_move"
      ],
      "manifest_name": "evolute-GameContract"
    }
  ],
  "models": [],
  "events": []
};

export const config = {
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  admin: {
    privateKey: process.env.ADMIN_PRIVATE_KEY,
    address: process.env.ADMIN_ADDRESS
  },
  dojo: {
    rpcUrl: process.env.DOJO_RPC_URL || 'https://api.cartridge.gg/x/dev-evolute-duel/katana',
    toriiUrl: process.env.DOJO_TORII_URL || 'https://api.cartridge.gg/x/dev-evolute-duel/torii',
    relayUrl: process.env.DOJO_RELAY_URL || 'http://localhost:9090',
    worldAddress: process.env.DOJO_WORLD_ADDRESS || '0x0230035e44105bbc11acf2dd1b271a78d53627a810e6a2fb024fd2edcf273c9c'
  },
  security: {
    apiSecretKey: process.env.API_SECRET_KEY
  }
};

export function createDojoClientConfig() {
  console.log('Creating Dojo client config with:', {
    rpcUrl: config.dojo.rpcUrl,
    toriiUrl: config.dojo.toriiUrl,
    worldAddress: config.dojo.worldAddress,
    adminAddress: config.admin.address,
    manifest: manifest
  });
  return createDojoConfig({
    manifest,
    rpcUrl: config.dojo.rpcUrl,
    toriiUrl: config.dojo.toriiUrl,
    relayUrl: config.dojo.relayUrl,
    worldAddress: config.dojo.worldAddress,
    masterAddress: config.admin.address,
    masterPrivateKey: config.admin.privateKey
  });
}

export function validateEnvironment() {
  const requiredVars = [
    'ADMIN_PRIVATE_KEY',
    'ADMIN_ADDRESS',
    'API_SECRET_KEY'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}