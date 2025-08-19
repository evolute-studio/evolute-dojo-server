import rateLimit from 'express-rate-limit';
import { config } from '../config/environment.js';

export const createRateLimiter = () => {
  return rateLimit({
    windowMs: config.security.rateLimitWindowMs,
    max: config.security.rateLimitMaxRequests,
    message: {
      success: false,
      error: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export const transactionRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 transaction requests per windowMs
  message: {
    success: false,
    error: 'Too many transaction requests, please slow down'
  },
  standardHeaders: true,
  legacyHeaders: false,
});