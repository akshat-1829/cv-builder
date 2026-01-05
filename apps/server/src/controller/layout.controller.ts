import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import ResponseHandler from '../utils/responseHandler.util';
import * as LayoutService from '../service/layout.service';

/**
 * Create layout (admin)
 * POST /api/layouts
 */
export const createLayout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Authentication/authorization omitted — this assumes authenticated user is allowed
    const { name, slug, description, template, previewImage } = req.body;

    const existing = await LayoutService.findLayoutBySlug(slug);
    if (existing) {
      ResponseHandler.conflict(res, 'Layout slug already exists');
      return;
    }

    const layout = await LayoutService.createLayout({ name, slug, description, template, previewImage });
    ResponseHandler.created(res, layout, 'Layout created');
  } catch (error) {
    next(error);
  }
};

/**
 * List layouts (public)
 * GET /api/layouts
 */
export const getLayouts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const layouts = await LayoutService.findAllLayouts();
    ResponseHandler.success(res, layouts, 'Layouts retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * Get layout by id
 * GET /api/layouts/:id
 */
export const getLayout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const layout = await LayoutService.findLayoutById(id);
    if (!layout) {
      ResponseHandler.notFound(res, 'Layout not found');
      return;
    }
    ResponseHandler.success(res, layout, 'Layout retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * Update layout
 * PUT /api/layouts/:id
 */
export const updateLayout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const layout = await LayoutService.updateLayoutById(id, req.body, { new: true, runValidators: true });
    if (!layout) {
      ResponseHandler.notFound(res, 'Layout not found');
      return;
    }
    ResponseHandler.success(res, layout, 'Layout updated');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete layout
 * DELETE /api/layouts/:id
 */
export const deleteLayout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const layout = await LayoutService.deleteLayoutById(id);
    if (!layout) {
      ResponseHandler.notFound(res, 'Layout not found');
      return;
    }
    ResponseHandler.success(res, null, 'Layout deleted');
  } catch (error) {
    next(error);
  }
};
