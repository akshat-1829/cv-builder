import { Router } from 'express';
import * as PaymentController from '../controller/payment.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

// Create payment intent (protected)
router.post('/create', authenticateJWT, PaymentController.createPayment);

export default router;
