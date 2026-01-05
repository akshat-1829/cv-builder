import { Router } from 'express';
import * as AuthController from '../controller/auth.controller';
import passport from '../config/passport.config';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', passport.authenticate('jwt', { session: false }), AuthController.getCurrentUser);
router.put('/profile', passport.authenticate('jwt', { session: false }), AuthController.updateProfile);
router.post('/logout', AuthController.logout);

// OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), AuthController.googleCallback);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), AuthController.facebookCallback);

export default router;
