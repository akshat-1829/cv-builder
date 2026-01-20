import { Router } from 'express';
import * as AuthController from '../controller/auth.controller';
import passport from '../config/passport.config';
import {
  logOAuthAttempt,
  logOAuthCallback,
} from '../middleware/logging.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  AuthController.getCurrentUser,
);
router.put(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  AuthController.updateProfile,
);
router.post('/logout', AuthController.logout);

// OAuth routes
router.get(
  '/google',
  logOAuthAttempt('Google'),
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/google/callback',
  logOAuthCallback('Google'),
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/error?message=Google authentication failed',
  }),
  AuthController.googleCallback,
);

router.get(
  '/facebook',
  logOAuthAttempt('Facebook'),
  passport.authenticate('facebook', { scope: ['email'] }),
);

router.get(
  '/facebook/callback',
  logOAuthCallback('Facebook'),
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/auth/error?message=Facebook authentication failed',
  }),
  AuthController.facebookCallback,
);

export default router;
