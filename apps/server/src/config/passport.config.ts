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
import { User, IUser } from '../db/models';

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
          // Check if user exists with Google ID
          let user = await User.findOne({
            authProvider: 'google',
            providerId: profile.id,
          });

          if (user) {
            return done(null, user);
          }

          // Check if email exists
          const existingUser = await User.findOne({
            email: profile.emails?.[0]?.value,
          });

          if (existingUser) {
            // Link Google to existing account
            existingUser.authProvider = 'google';
            existingUser.providerId = profile.id;
            existingUser.profilePicture = profile.photos?.[0]?.value;
            existingUser.isEmailVerified = true;
            await existingUser.save();
            return done(null, existingUser);
          }

          // Create new user
          const username =
            profile.displayName?.replace(/\s+/g, '_').toLowerCase() ||
            profile.emails?.[0]?.value.split('@')[0] ||
            `user_${Date.now()}`;

          user = await User.create({
            username,
            email: profile.emails?.[0]?.value,
            authProvider: 'google',
            providerId: profile.id,
            profilePicture: profile.photos?.[0]?.value,
            isEmailVerified: true,
          });

          return done(null, user);
        } catch (error) {
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
          // Check if user exists with Facebook ID
          let user = await User.findOne({
            authProvider: 'facebook',
            providerId: profile.id,
          });

          if (user) {
            return done(null, user);
          }

          // Check if email exists
          const existingUser = await User.findOne({
            email: profile.emails?.[0]?.value,
          });

          if (existingUser) {
            // Link Facebook to existing account
            existingUser.authProvider = 'facebook';
            existingUser.providerId = profile.id;
            existingUser.profilePicture = profile.photos?.[0]?.value;
            existingUser.isEmailVerified = true;
            await existingUser.save();
            return done(null, existingUser);
          }

          // Create new user
          const username =
            profile.displayName?.replace(/\s+/g, '_').toLowerCase() ||
            profile.emails?.[0]?.value?.split('@')[0] ||
            `user_${Date.now()}`;

          user = await User.create({
            username,
            email: profile.emails?.[0]?.value,
            authProvider: 'facebook',
            providerId: profile.id,
            profilePicture: profile.photos?.[0]?.value,
            isEmailVerified: true,
          });

          return done(null, user);
        } catch (error) {
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
