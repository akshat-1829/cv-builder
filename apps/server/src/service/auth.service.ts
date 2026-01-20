// server/service/auth.service.ts

import { User, IUser } from '../db/models';
import { UpdateQuery, QueryOptions } from 'mongoose';

export interface CreateUserDTO {
  username: string;
  email: string;
  password?: string;
  contactNumber?: string;
  authProvider: 'local' | 'google' | 'facebook';
  providerId?: string;
  profilePicture?: string;
  isEmailVerified?: boolean;
}

/**
 * Find user by email
 */
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email }).select('+password');
};

/**
 * Find user by username
 */
export const findUserByUsername = async (
  username: string,
): Promise<IUser | null> => {
  return await User.findOne({ username }).select('+password');
};

/**
 * Find user by ID
 */
export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

/**
 * Find user by OAuth provider and provider ID
 */
export const findUserByProvider = async (
  provider: 'google' | 'facebook',
  providerId: string,
): Promise<IUser | null> => {
  return await User.findOne({
    authProvider: provider,
    providerId: providerId,
  });
};

/**
 * Create new user
 */
export const createUser = async (userData: CreateUserDTO): Promise<IUser> => {
  const user = await User.create(userData);
  return user;
};

/**
 * Update user by ID
 */
export const updateUserById = async (
  id: string,
  updateData: UpdateQuery<IUser>,
  options?: QueryOptions,
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updateData, options);
};

/**
 * Link OAuth provider to existing user
 */
export const linkOAuthProvider = async (
  userId: string,
  provider: 'google' | 'facebook',
  providerId: string,
  profilePicture?: string,
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    userId,
    {
      authProvider: provider,
      providerId: providerId,
      ...(profilePicture && { profilePicture }),
      isEmailVerified: true,
    },
    { new: true },
  );
};

/**
 * Find or create user from OAuth profile
 */
export const findOrCreateOAuthUser = async (
  provider: 'google' | 'facebook',
  profile: {
    id: string;
    email?: string;
    displayName?: string;
    photos?: Array<{ value: string }>;
  },
): Promise<IUser> => {
  try {
    // 1. Check if user exists with this provider ID
    let user = await findUserByProvider(provider, profile.id);

    if (user) {
      console.log(`✅ Found existing ${provider} user:`, user.email);
      return user;
    }

    // 2. Check if email exists with any account
    if (profile.email) {
      const existingUser = await findUserByEmail(profile.email);

      if (existingUser) {
        console.log(
          `✅ Linking ${provider} to existing user:`,
          existingUser.email,
        );

        // Link OAuth provider to existing account
        const updatedUser = await linkOAuthProvider(
          existingUser._id.toString(),
          provider,
          profile.id,
          profile.photos?.[0]?.value,
        );

        if (updatedUser) {
          return updatedUser;
        }
      }
    }

    // 3. Create new user
    console.log(`✅ Creating new ${provider} user:`, profile.email);

    // Generate unique username
    let username =
      profile.displayName
        ?.replace(/\s+/g, '_')
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '') ||
      profile.email?.split('@')[0] ||
      `user_${Date.now()}`;

    // Ensure username is unique
    let usernameExists = await findUserByUsername(username);
    let counter = 1;

    while (usernameExists) {
      username = `${username}${counter}`;
      usernameExists = await findUserByUsername(username);
      counter++;
    }

    user = await createUser({
      username,
      email: profile.email || `${profile.id}@${provider}.com`,
      authProvider: provider,
      providerId: profile.id,
      profilePicture: profile.photos?.[0]?.value,
      isEmailVerified: true,
    });

    console.log(`✅ Created new ${provider} user:`, user.email);
    return user;
  } catch (error) {
    console.error(`❌ Error in findOrCreateOAuthUser:`, error);
    throw error;
  }
};
