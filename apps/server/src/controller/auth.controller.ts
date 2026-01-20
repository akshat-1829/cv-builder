import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { generateAuthResponse } from '../utils/jwt.utils';
import ResponseHandler from '../utils/responseHandler.util';
import config from '../config/environment.config';
import * as AuthService from '../service/auth.service';

/**
 * Register new user with email and password
 * POST /api/auth/register
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { username, email, password, contactNumber } = req.body;

    // Check if user already exists
    const existingUser = await AuthService.findUserByEmail(email) ||
                         await AuthService.findUserByUsername(username);

    if (existingUser) {
      ResponseHandler.conflict(
        res,
        existingUser.email === email
          ? 'Email already registered'
          : 'Username already taken',
      );
      return;
    }

    // Create new user
    const user = await AuthService.createUser({
      username,
      email,
      password,
      contactNumber,
      authProvider: 'local',
    });

    // Generate token and response
    const response = generateAuthResponse(user);

    ResponseHandler.created(res, response, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Login with email and password
 * POST /api/auth/login
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user =
    (await AuthService.findUserByEmail(email)) ||
    (await AuthService.findUserByUsername(email));

    console.log('user: ', user);
    if (!user) {
      ResponseHandler.unauthorized(res, 'Invalid email or password');
      return;
    }

    // Check if user is local auth (has password)
    if (user.authProvider !== 'local' || !user.password) {
      ResponseHandler.badRequest(
        res,
        `This account uses ${user.authProvider} authentication. Please login with ${user.authProvider}.`,
      );
      return;
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      ResponseHandler.unauthorized(res, 'Invalid email or password');
      return;
    }

    // Generate token and response
    const response = generateAuthResponse(user);

    ResponseHandler.success(res, response, 'Login successful');
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHandler.unauthorized(res, 'Not authenticated');
      return;
    }

    const user = await AuthService.findUserById(req.user._id.toString());

    if (!user) {
      ResponseHandler.notFound(res, 'User not found');
      return;
    }

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      contactNumber: user.contactNumber,
      authProvider: user.authProvider,
      profilePicture: user.profilePicture,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    };

    ResponseHandler.success(
      res,
      userData,
      'User profile retrieved successfully',
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * PUT /api/auth/profile
 */
export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHandler.unauthorized(res, 'Not authenticated');
      return;
    }

    const { username, contactNumber } = req.body;

    // Check if username is taken by another user
    if (username && username !== req.user.username) {
      const existingUser = await AuthService.findUserByUsername(username);
      if (existingUser) {
        ResponseHandler.conflict(res, 'Username already taken');
        return;
      }
    }

    // Update user
    const updatedUser = await AuthService.updateUserById(
      req.user._id.toString(),
      {
        ...(username && { username }),
        ...(contactNumber !== undefined && { contactNumber }),
      },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      ResponseHandler.notFound(res, 'User not found');
      return;
    }

    const userData = {
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      contactNumber: updatedUser.contactNumber,
      authProvider: updatedUser.authProvider,
      profilePicture: updatedUser.profilePicture,
      isEmailVerified: updatedUser.isEmailVerified,
    };

    ResponseHandler.success(res, userData, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export const googleCallback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      console.error('❌ No user found in Google callback');
      const errorUrl = `${config.client.url}/auth/callback?message=${encodeURIComponent('Google authentication failed')}`;
      res.redirect(errorUrl);
      return;
    }

    const user = req.user as any;
    console.log('✅ Google user authenticated:', user.email);

    // Generate JWT token
    const response = generateAuthResponse(user);

    console.log('✅ Token generated for Google user');

    // Redirect to frontend callback page with token
    const redirectUrl = `${config.client.url}/auth/callback?token=${response.token}&provider=google`;

    console.log('🔗 Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ Google callback error:', error);
    const errorUrl = `${config.client.url}/auth/callback?message=${encodeURIComponent('Authentication error')}`;
    res.redirect(errorUrl);
  }
};

/**
 * Facebook OAuth callback handler
 * GET /api/auth/facebook/callback
 */
export const facebookCallback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      console.error('❌ No user found in Facebook callback');
      const errorUrl = `${config.client.url}/auth/callback?message=${encodeURIComponent('Facebook authentication failed')}`;
      res.redirect(errorUrl);
      return;
    }

    const user = req.user as any;
    console.log('✅ Facebook user authenticated:', user.email);

    // Generate JWT token
    const response = generateAuthResponse(user);

    console.log('✅ Token generated for Facebook user');

    // Redirect to frontend callback page with token
    const redirectUrl = `${config.client.url}/auth/callback?token=${response.token}&provider=facebook`;

    console.log('🔗 Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ Facebook callback error:', error);
    const errorUrl = `${config.client.url}/auth/callback?message=${encodeURIComponent('Authentication error')}`;
    res.redirect(errorUrl);
  }
};


/**
 * Logout user (optional - mainly for client-side token removal)
 * POST /api/auth/logout
 */
export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // For JWT, logout is handled client-side by removing the token
    // You can add token blacklisting here if needed

    ResponseHandler.success(
      res,
      null,
      'Logout successful. Please remove the token from client.',
    );
  } catch (error) {
    next(error);
  }
};
