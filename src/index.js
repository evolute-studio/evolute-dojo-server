import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config, validateEnvironment } from './config/environment.js';
import { dojoService } from './services/dojoService.js';
import { createRateLimiter } from './middleware/rateLimiter.js';
import routes from './routes/index.js';

const app = express();

async function startServer() {
  try {
    // Validate environment variables
    validateEnvironment();
    console.log('Environment variables validated ✓');

    // Security middleware
    app.use(helmet());
    app.use(cors({
      origin: config.server.corsOrigin,
      credentials: true
    }));

    // Rate limiting
    app.use(createRateLimiter());

    // Body parsing
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use('/api', routes);

    // Error handling middleware
    app.use((error, req, res, next) => {
      console.error('Unhandled error:', error);
      res.status(500).json({
        success: false,
        error: config.server.nodeEnv === 'development' ? error.message : 'Internal server error'
      });
    });

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        error: 'Endpoint not found'
      });
    });

    // Initialize Dojo service
    console.log('Initializing Dojo service...');
    await dojoService.initialize();
    console.log('Dojo service initialized ✓');

    // Start server
    const server = app.listen(config.server.port, () => {
      console.log(`
🚀 Evolute Dojo Admin Server started successfully!

📡 Server URL: http://localhost:${config.server.port}
🏥 Health check: http://localhost:${config.server.port}/api/health
🔧 Environment: ${config.server.nodeEnv}
🏦 Admin address: ${config.admin.address}

Available endpoints:
- GET  /api/health - Health check
- GET  /api/account - Get admin account info
- POST /api/execute - Execute transaction
- POST /api/call - Call contract function
      `);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();