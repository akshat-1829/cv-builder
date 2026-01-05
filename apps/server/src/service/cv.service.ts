import { CV, ICV } from '../db/models';

/**
 * Create a new CV
 */
export const createCV = async (cvData: Partial<ICV>): Promise<ICV> => {
  return CV.create(cvData);
};

/**
 * Find CVs by user ID
 */
export const findCVsByUser = async (userId: string): Promise<ICV[]> => {
  return CV.find({ user: userId }).sort({ updatedAt: -1 });
};

/**
 * Find CV by ID
 */
export const findCVById = async (id: string): Promise<ICV | null> => {
  return CV.findById(id).populate('user', 'username email');
};

/**
 * Find CV by ID and user (for ownership check)
 */
export const findCVByIdAndUser = async (
  id: string,
  userId: string,
): Promise<ICV | null> => {
  return CV.findOne({ _id: id, user: userId });
};

/**
 * Update CV by ID and user
 */
export const updateCVByIdAndUser = async (
  id: string,
  userId: string,
  updateData: Partial<ICV>,
  options: { new?: boolean; runValidators?: boolean } = {},
): Promise<ICV | null> => {
  return CV.findOneAndUpdate({ _id: id, user: userId }, updateData, options);
};

/**
 * Delete CV by ID and user
 */
export const deleteCVByIdAndUser = async (
  id: string,
  userId: string,
): Promise<ICV | null> => {
  return CV.findOneAndDelete({ _id: id, user: userId });
};
