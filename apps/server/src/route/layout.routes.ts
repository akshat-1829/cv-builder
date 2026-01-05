import { Router } from 'express';
import * as LayoutController from '../controller/layout.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

// Public
router.get('/', LayoutController.getLayouts);
router.get('/:id', LayoutController.getLayout);

// Protected (create/update/delete)
router.post('/', authenticateJWT, LayoutController.createLayout);
router.put('/:id', authenticateJWT, LayoutController.updateLayout);
router.delete('/:id', authenticateJWT, LayoutController.deleteLayout);

export default router;
