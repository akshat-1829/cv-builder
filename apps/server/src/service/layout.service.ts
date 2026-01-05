import { Layout, ILayout } from '../db/models';

/**
 * Create a new layout
 */
export const createLayout = async (layoutData: Partial<ILayout>): Promise<ILayout> => {
  return Layout.create(layoutData);
};

/**
 * Find all layouts
 */
export const findAllLayouts = async (): Promise<ILayout[]> => {
  return Layout.find().sort({ createdAt: -1 });
};

/**
 * Find layout by ID
 */
export const findLayoutById = async (id: string): Promise<ILayout | null> => {
  return Layout.findById(id);
};

/**
 * Find layout by slug
 */
export const findLayoutBySlug = async (slug: string): Promise<ILayout | null> => {
  return Layout.findOne({ slug });
};

/**
 * Update layout by ID
 */
export const updateLayoutById = async (
  id: string,
  updateData: Partial<ILayout>,
  options: { new?: boolean; runValidators?: boolean } = {},
): Promise<ILayout | null> => {
  return Layout.findByIdAndUpdate(id, updateData, options);
};

/**
 * Delete layout by ID
 */
export const deleteLayoutById = async (id: string): Promise<ILayout | null> => {
  return Layout.findByIdAndDelete(id);
};