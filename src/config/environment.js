import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  },
  admin: {
    privateKey: process.env.ADMIN_PRIVATE_KEY,
    address: process.env.ADMIN_ADDRESS
  },
  dojo: {
    rpcUrl: process.env.DOJO_RPC_URL || 'http://localhost:5050',
    toriiUrl: process.env.DOJO_TORII_URL || 'http://localhost:8080',
    relayUrl: process.env.DOJO_RELAY_URL || 'http://localhost:9090'
  },
  security: {
    apiSecretKey: process.env.API_SECRET_KEY,
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  }
};

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