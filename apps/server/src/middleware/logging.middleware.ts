// server/middleware/logging.middleware.ts

import { Request, Response, NextFunction } from 'express';

export const logOAuthAttempt = (provider: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(`🔵 ${provider} OAuth initiated`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);
    console.log(`   IP: ${req.ip}`);
    next();
  };
};

export const logOAuthCallback = (provider: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(`🔵 ${provider} OAuth callback received`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);
    console.log(`   Has user: ${!!req.user}`);
    if (req.user) {
      console.log(`   User: ${(req.user as any).email}`);
    }
    next();
  };
};
