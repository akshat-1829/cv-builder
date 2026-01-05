import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IUser } from '../db/models';

/**
 * JWT Authentication Middleware
 */
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Invalid or expired token',
        });
      }

      req.user = user;
      next();
    },
  )(req, res, next);
};

/**
 * Optional Authentication
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate('jwt', { session: false }, (err: unknown, user: IUser) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};
