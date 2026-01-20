import { Router } from 'express';
import * as CVController from '../controller/cv.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

// Create a new CV
router.post('/create-cv', authenticateJWT, CVController.createCV);

// Get all CVs for the authenticated user
router.get('/get-all-cv', authenticateJWT, CVController.getCVs);

// Get a single CV by ID (with permission check)
router.get('/update-cv/:id', authenticateJWT, CVController.getCV);

// Update a CV by ID (owner only)
router.put('/update-cv/:id', authenticateJWT, CVController.updateCV);

// Delete a CV by ID (owner only)
router.delete('/delete-cv/:id', authenticateJWT, CVController.deleteCV);

// Download CV as PDF (owner or public)
router.get('/delete-cv/:id/download', authenticateJWT, CVController.downloadCV);

export default router;
