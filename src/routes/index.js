import express from 'express';
import { TransactionController } from '../controllers/transactionController.js';
import { GameController } from '../controllers/gameController.js';
import { authenticateApiKey, validateTransactionRequest } from '../middleware/auth.js';
import { transactionRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Health check endpoint (no auth required)
router.get('/health', TransactionController.healthCheck);

// Account info endpoint
router.get('/account', authenticateApiKey, TransactionController.getAccountInfo);

// Game-specific endpoints
router.post('/game/create', 
  authenticateApiKey,
  transactionRateLimiter,
  GameController.createGame
);

router.post('/game/join',
  authenticateApiKey,
  transactionRateLimiter,
  GameController.joinGame
);

router.get('/game/state',
  authenticateApiKey,
  GameController.getGameState
);

// Generic transaction endpoints
router.post('/execute', 
  authenticateApiKey,
  validateTransactionRequest,
  transactionRateLimiter,
  TransactionController.executeTransaction
);

router.post('/call',
  authenticateApiKey,
  validateTransactionRequest,
  TransactionController.callContract
);

export default router;