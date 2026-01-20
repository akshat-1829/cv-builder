// server/config/passport.config.ts

import passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from 'passport-google-oauth20';
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from 'passport-facebook';
import config from './environment.config';
import { User } from '../db/models';
import * as AuthService from '../service/auth.service';

/**
 * JWT Strategy - Validates JWT tokens in requests
 */
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }),
);

console.log('✅ JWT strategy configured');

/**
 * Google OAuth Strategy
 */
if (config.oauth.google.clientId && config.oauth.google.clientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.oauth.google.clientId,
        clientSecret: config.oauth.google.clientSecret,
        callbackURL: config.oauth.google.callbackUrl,
        scope: ['profile', 'email'],
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: GoogleProfile,
        done: (error: any, user?: any) => void,
      ) => {
        try {
          console.log('🔵 Google OAuth callback received');
          console.log('Profile:', {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
          });

          const user = await AuthService.findOrCreateOAuthUser('google', {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            displayName: profile.displayName,
            photos: profile.photos,
          });

          return done(null, user);
        } catch (error) {
          console.error('❌ Google OAuth error:', error);
          return done(error, undefined);
        }
      },
    ),
  );
  console.log('✅ Google OAuth strategy configured');
} else {
  console.log('⚠️  Google OAuth not configured (missing credentials)');
}

/**
 * Facebook OAuth Strategy
 */
if (config.oauth.facebook.appId && config.oauth.facebook.appSecret) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.oauth.facebook.appId,
        clientSecret: config.oauth.facebook.appSecret,
        callbackURL: config.oauth.facebook.callbackUrl,
        profileFields: ['id', 'displayName', 'emails', 'photos'],
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: FacebookProfile,
        done: (error: any, user?: any) => void,
      ) => {
        try {
          console.log('🔵 Facebook OAuth callback received');
          console.log('Profile:', {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
          });

          const user = await AuthService.findOrCreateOAuthUser('facebook', {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            displayName: profile.displayName,
            photos: profile.photos,
          });

          return done(null, user);
        } catch (error) {
          console.error('❌ Facebook OAuth error:', error);
          return done(error, undefined);
        }
      },
    ),
  );
  console.log('✅ Facebook OAuth strategy configured');
} else {
  console.log('⚠️  Facebook OAuth not configured (missing credentials)');
}

export default passport;
