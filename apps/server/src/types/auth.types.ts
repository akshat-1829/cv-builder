import { Request } from 'express';
import { IUser } from '../db/models';

/**
 * Request with optional user
 */
export interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * Request with guaranteed user (after authentication middleware)
 */
export interface AuthenticatedRequest extends Request {
  user: IUser; // Non-optional
}

/**
 * Type guard to check if request has authenticated user
 */
export function isAuthenticated(req: Request): req is AuthenticatedRequest {
  return !!req.user;
}
