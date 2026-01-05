import { Router } from 'express';
import * as CVController from '../controller/cv.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, CVController.createCV);
router.get('/', authenticateJWT, CVController.getCVs);
router.get('/:id', CVController.getCV); // public if marked public
router.put('/:id', authenticateJWT, CVController.updateCV);
router.delete('/:id', authenticateJWT, CVController.deleteCV);
router.get('/:id/download', authenticateJWT, CVController.downloadCV);

export default router;
