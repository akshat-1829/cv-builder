import * as dotenv from 'dotenv';
import * as path from 'path';
import type { EnvironmentConfig, Environment } from '@cv-builder/shared-types';

// Determine environment
const environment: Environment =
  (process.env.NODE_ENV as Environment) || 'local';

// Load appropriate .env file from apps/server directory
const envFile = `.env.${environment}`;
const envPath = path.resolve(__dirname, '../../', envFile);

console.log(`📂 Loading environment from: ${envPath}`);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn(`⚠️  Could not load ${envFile}, trying default .env`);
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

/**
 * Get environment variable with validation
 */
const getEnvVariable = (key: string, required = true): string => {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }

  return value || '';
};

/**
 * Parse integer from environment variable
 */
const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = process.env[key];
  if (!value) return defaultValue;

  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`❌ Environment variable ${key} must be a number`);
  }

  return parsed;
};

/**
 * Application Configuration
 */
const config: EnvironmentConfig = {
  env: environment,
  port: getEnvNumber('PORT', 5000),
  baseUrl: getEnvVariable('BASE_URL'),

  database: {
    uri: getEnvVariable('MONGODB_URI'),
  },

  jwt: {
    secret: getEnvVariable('JWT_SECRET'),
    expire: getEnvVariable('JWT_EXPIRE', false) || '7d',
  },

  oauth: {
    google: {
      clientId: getEnvVariable('GOOGLE_CLIENT_ID', false),
      clientSecret: getEnvVariable('GOOGLE_CLIENT_SECRET', false),
      callbackUrl: getEnvVariable('GOOGLE_CALLBACK_URL', false),
    },
    facebook: {
      appId: getEnvVariable('FACEBOOK_APP_ID', false),
      appSecret: getEnvVariable('FACEBOOK_APP_SECRET', false),
      callbackUrl: getEnvVariable('FACEBOOK_CALLBACK_URL', false),
    },
  },

  payment: {
    stripeSecretKey: getEnvVariable('STRIPE_SECRET_KEY'),
    amount: getEnvNumber('PAYMENT_AMOUNT', 500),
    currency: getEnvVariable('PAYMENT_CURRENCY', false) || 'INR',
  },

  client: {
    url: getEnvVariable('CLIENT_URL'),
  },

  cors: {
    origin: getEnvVariable('CORS_ORIGIN'),
  },

  rateLimit: {
    windowMs: getEnvNumber('RATE_LIMIT_WINDOW_MS', 900000),
    maxRequests: getEnvNumber('RATE_LIMIT_MAX_REQUESTS', 100),
  },
};

/**
 * Environment Helper Functions
 */
export const isDevelopment = (): boolean => config.env === 'local';
export const isStaging = (): boolean => config.env === 'staging';
export const isProduction = (): boolean => config.env === 'production';

/**
 * Log Configuration (non-sensitive data only)
 */
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`🌍 Environment: ${config.env}`);
console.log(`🚀 Port: ${config.port}`);
console.log(`🔗 Base URL: ${config.baseUrl}`);
console.log(`🎯 Client URL: ${config.client.url}`);
console.log(`💰 Payment: ${config.payment.currency} ${config.payment.amount}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

export default config;
