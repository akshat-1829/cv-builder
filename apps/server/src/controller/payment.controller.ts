import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../utils/responseHandler.util';
import config from '../config/environment.config';

/**
 * Create payment intent / record
 * POST /api/payments/create
 * NOTE: Stripe SDK is not wired in this project by default. This controller provides
 * a clear integration point — replace the TODO with `stripe` calls using `config.payment.stripeSecretKey`.
 */
export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { amount, currency } = req.body;

    if (!config.payment.stripeSecretKey) {
      // Fallback behavior for local/dev environments
      ResponseHandler.success(res, { amount, currency }, 'Stripe not configured — mock payment created');
      return;
    }

    // TODO: integrate with Stripe SDK here
    ResponseHandler.success(res, { amount, currency }, 'Payment endpoint stub — integrate Stripe SDK');
  } catch (error) {
    next(error);
  }
};
