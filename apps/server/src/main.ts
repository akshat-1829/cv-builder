import { startServer } from './server';

/**
 * Application Entry Point
 */
console.log('🎯 CV Builder Backend - Starting...\n');

startServer().catch((error) => {
  console.error('💥 Fatal error during server startup:');
  console.error(error);
  process.exit(1);
});
