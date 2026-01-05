import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import config from './config/environment.config';
import { connectDatabase } from './db/connection';

/**
 * Create Express Application
 */
export const createServer = (): Application => {
  const app = express();

  console.log('🔧 Setting up Express application...');

  // Security middleware (MUST BE FIRST)
  app.use(helmet());
  console.log('✅ Security headers (Helmet) configured');

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  console.log('✅ Body parsing middleware configured');

  // CORS configuration
  app.use(
    cors({
      origin: config.cors.origin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );
  console.log('✅ CORS configured for:', config.cors.origin);

  // Rate limiting
  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use('/api/', limiter);
  console.log(
    `✅ Rate limiting: ${config.rateLimit.maxRequests} requests per ${config.rateLimit.windowMs / 1000}s`,
  );

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      status: 'healthy',
      environment: config.env,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });
  console.log('✅ Health check endpoint: GET /health');

  // 404 handler for undefined routes
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.method} ${req.path} not found`,
    });
  });

  // Error handling middleware (MUST BE LAST)
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('❌ Error caught by error handler:');
    console.error(err);

    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
      success: false,
      message,
      ...(config.env === 'local' && {
        stack: err.stack,
        error: err,
      }),
    });
  });

  console.log('✅ Error handling middleware configured');

  return app;
};

/**
 * Start the server
 */
export const startServer = async (): Promise<void> => {
  try {
    console.log('\n🚀 Starting CV Builder Server...\n');

    // Connect to database
    await connectDatabase();

    // Create Express app
    const app = createServer();

    // Start listening
    const server = app.listen(config.port, () => {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ Server Started Successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🌐 Listening on: ${config.baseUrl}`);
      console.log(`📝 Environment: ${config.env}`);
      console.log(`💾 Database: Connected`);
      console.log(
        `⏰ Started at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
      );
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`\n👋 ${signal} received`);
      console.log('🔄 Closing server gracefully...');

      server.close(() => {
        console.log('✅ Server closed');
        console.log('👋 Goodbye!\n');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('⚠️  Forcing shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('\n❌ Failed to start server:');
    console.error(error);
    console.error('\n💥 Shutting down...\n');
    process.exit(1);
  }
};
