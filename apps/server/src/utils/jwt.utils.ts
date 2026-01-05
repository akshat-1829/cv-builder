import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config/environment.config';
import { IUser } from '../db/models';
import { StringValue } from '@cv-builder/shared-types';

interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

/**
 * Generate JWT token for user
 */
export const generateToken = (user: IUser): string => {
  const payload: TokenPayload = {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
  };

  // Type guard to ensure secret exists
  const secret = config.jwt.secret;
  if (!secret) {
    throw new Error('JWT secret is not configured');
  }

  // Sign options with proper typing
  const options: SignOptions = {
    expiresIn: (config.jwt.expire || '7d') as StringValue,
  };

  return jwt.sign(payload, secret, options);
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): TokenPayload => {
  const secret = config.jwt.secret;
  if (!secret) {
    throw new Error('JWT secret is not configured');
  }

  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

/**
 * Generate response with token and user data
 */
export const generateAuthResponse = (user: IUser) => {
  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      contactNumber: user.contactNumber,
      authProvider: user.authProvider,
      profilePicture: user.profilePicture,
      isEmailVerified: user.isEmailVerified,
    },
  };
};
