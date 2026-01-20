// src/config/env.ts

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  appName: import.meta.env.VITE_APP_NAME || 'CV Builder',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

// Type-safe access
export type Config = typeof config;
