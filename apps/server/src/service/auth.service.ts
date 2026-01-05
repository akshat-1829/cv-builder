import { User, IUser } from '../db/models';
import bcrypt from 'bcryptjs';

/**
 * Find user by email
 */
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email }).select('+password');
};

/**
 * Find user by username
 */
export const findUserByUsername = async (username: string): Promise<IUser | null> => {
  return User.findOne({ username });
};

/**
 * Find user by ID
 */
export const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

/**
 * Create new user
 */
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  return User.create(userData);
};

/**
 * Update user by ID
 */
export const updateUserById = async (
  id: string,
  updateData: Partial<IUser>,
  options: { new?: boolean; runValidators?: boolean } = {},
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(id, updateData, options);
};

/**
 * Find user by OAuth provider and ID
 */
export const findUserByProvider = async (
  provider: string,
  providerId: string,
): Promise<IUser | null> => {
  return User.findOne({ authProvider: provider, providerId });
};

/**
 * Find user by email (for OAuth linking)
 */
export const findUserByEmailForOAuth = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

/**
 * Update user (for OAuth linking)
 */
export const updateUserForOAuth = async (
  id: string,
  updateData: Partial<IUser>,
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(id, updateData, { new: true });
};