import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import ResponseHandler from '../utils/responseHandler.util';
import * as CVService from '../service/cv.service';

/**
 * Create a new CV
 * POST /api/cvs
 */
export const createCV = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHandler.unauthorized(res, 'Not authenticated');
      return;
    }

    const { title, layout, data, isPublic } = req.body;

    const cv = await CVService.createCV({
      user: req.user._id,
      title,
      layout,
      data,
      isPublic: !!isPublic,
    });

    ResponseHandler.created(res, cv, 'CV created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get all CVs for authenticated user
 * GET /api/cvs
 */
export const getCVs = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHandler.unauthorized(res, 'Not authenticated');
      return;
    }

    const cvs = await CVService.findCVsByUser(req.user._id.toString());

    ResponseHandler.success(res, cvs, 'CVs retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get single CV by id (owner or public)
 * GET /api/cvs/:id
 */
export const getCV = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const cv = await CVService.findCVById(id);

    if (!cv) {
      ResponseHandler.notFound(res, 'CV not found');
      return;
    }

    // If CV is private, ensure ownership
    if (!cv.isPublic && !(req as any).user?.id && !(req as any).user?._id) {
      // not authenticated - deny
      ResponseHandler.unauthorized(res, 'Not authorized to view this CV');
      return;
    }

    ResponseHandler.success(res, cv, 'CV retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update CV (owner only)
 * PUT /api/cvs/:id
 */
export const updateCV = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHandler.unauthorized(res, 'Not authenticated');
      return;
    }

    const { id } = req.params;

    const cv = await CVService.updateCVByIdAndUser(
      id,
      req.user._id.toString(),
      req.body,
      { new: true, runValidators: true },
    );

    if (!cv) {
      ResponseHandler.notFound(res, 'CV not found or not owned by user');
      return;
    }

    ResponseHandler.success(res, cv, 'CV updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete CV (owner only)
 * DELETE /api/cvs/:id
 */
export const deleteCV = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHandler.unauthorized(res, 'Not authenticated');
      return;
    }

    const { id } = req.params;

    const cv = await CVService.deleteCVByIdAndUser(id, req.user._id.toString());

    if (!cv) {
      ResponseHandler.notFound(res, 'CV not found or not owned by user');
      return;
    }

    ResponseHandler.success(res, null, 'CV deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Download CV (PDF generation not implemented here)
 * GET /api/cvs/:id/download
 */
export const downloadCV = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // This is a placeholder for PDF generation logic (e.g., Puppeteer, html-pdf)
    // For now, return the CV JSON and a message.
    const { id } = req.params;
    const cv = await CVService.findCVById(id);

    if (!cv) {
      ResponseHandler.notFound(res, 'CV not found');
      return;
    }

    ResponseHandler.success(res, { cv }, 'PDF generation not implemented');
  } catch (error) {
    next(error);
  }
};
