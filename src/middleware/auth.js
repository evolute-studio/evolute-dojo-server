import { config } from '../config/environment.js';

export function authenticateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'API key required'
    });
  }

  if (apiKey !== config.security.apiSecretKey) {
    return res.status(403).json({
      success: false,
      error: 'Invalid API key'
    });
  }

  next();
}

export function validateTransactionRequest(req, res, next) {
  const { contractAddress, functionName } = req.body;

  if (!contractAddress || !functionName) {
    return res.status(400).json({
      success: false,
      error: 'Contract address and function name are required'
    });
  }

  // Basic validation for contract address format
  if (!/^0x[a-fA-F0-9]{64}$/.test(contractAddress)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid contract address format'
    });
  }

  next();
}