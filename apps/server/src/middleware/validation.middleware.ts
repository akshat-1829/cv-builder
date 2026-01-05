import { Request, Response, NextFunction } from 'express';
import { validationResult, body, ValidationChain } from 'express-validator';
import ResponseHandler from '../utils/responseHandler.util';

/**
 * Middleware to handle validation results
 */
export const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.type === 'field' ? err.path : undefined,
      message: err.msg,
    }));

    ResponseHandler.validationError(res, formattedErrors, 'Validation failed');
    return;
  }

  next();
};

/**
 * Registration validation rules
 */
export const registerValidation: ValidationChain[] = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3-50 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('contactNumber')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Contact number must be exactly 10 digits'),
];

/**
 * Login validation rules
 */
export const loginValidation: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password').notEmpty().withMessage('Password is required'),
];

/**
 * Update profile validation
 */
export const updateProfileValidation: ValidationChain[] = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3-50 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),

  body('contactNumber')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Contact number must be exactly 10 digits'),
];
