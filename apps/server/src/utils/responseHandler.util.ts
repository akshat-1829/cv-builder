import { Response } from 'express';

/**
 * Standard API Response Interface
 */
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
  pagination?: PaginationMeta;
  timestamp: string;
}

/**
 * Pagination Metadata Interface
 */
interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Response Handler Class
 */
class ResponseHandler {
  /**
   * Send success response
   * @param res - Express response object
   * @param data - Response data
   * @param message - Success message
   * @param statusCode - HTTP status code (default: 200)
   */
  static success<T=any>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200,
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send created response (201)
   * @param res - Express response object
   * @param data - Created resource data
   * @param message - Success message
   */
  static created<T>(
    res: Response,
    data: T,
    message = 'Resource created successfully',
  ): Response {
    return this.success(res, data, message, 201);
  }

  /**
   * Send no content response (204)
   * @param res - Express response object
   */
  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  /**
   * Send error response
   * @param res - Express response object
   * @param message - Error message
   * @param statusCode - HTTP status code (default: 500)
   * @param error - Additional error details
   */
  static error(
    res: Response,
    message = 'Internal server error',
    statusCode = 500,
    error?: Error,
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    };

    // Include error details only in development
    if (process.env.NODE_ENV === 'local' && error) {
      response.error = (error.message || error) as string;
      if (error.stack) {
        response.errors = [{ stack: error.stack }];
      }
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Send bad request response (400)
   * @param res - Express response object
   * @param message - Error message
   * @param errors - Validation errors array
   */
  static badRequest(
    res: Response,
    message = 'Bad request',
    errors?: any[],
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    };

    if (errors && errors.length > 0) {
      response.errors = errors;
    }

    return res.status(400).json(response);
  }

  /**
   * Send unauthorized response (401)
   * @param res - Express response object
   * @param message - Error message
   */
  static unauthorized(
    res: Response,
    message = 'Unauthorized access',
  ): Response {
    return this.error(res, message, 401);
  }

  /**
   * Send forbidden response (403)
   * @param res - Express response object
   * @param message - Error message
   */
  static forbidden(res: Response, message = 'Forbidden'): Response {
    return this.error(res, message, 403);
  }

  /**
   * Send not found response (404)
   * @param res - Express response object
   * @param message - Error message
   */
  static notFound(
    res: Response,
    message = 'Resource not found',
  ): Response {
    return this.error(res, message, 404);
  }

  /**
   * Send conflict response (409)
   * @param res - Express response object
   * @param message - Error message
   */
  static conflict(
    res: Response,
    message = 'Resource conflict',
  ): Response {
    return this.error(res, message, 409);
  }

  /**
   * Send validation error response (422)
   * @param res - Express response object
   * @param errors - Validation errors array
   * @param message - Error message
   */
  static validationError(
    res: Response,
    errors: any[],
    message = 'Validation failed',
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    };

    return res.status(422).json(response);
  }

  /**
   * Send paginated response
   * @param res - Express response object
   * @param data - Array of data
   * @param page - Current page number
   * @param limit - Items per page
   * @param total - Total number of items
   * @param message - Success message
   */
  static paginated<T>(
    res: Response,
    data: T[],
    page: number,
    limit: number,
    total: number,
    message = 'Data retrieved successfully',
  ): Response {
    const totalPages = Math.ceil(total / limit);

    const pagination: PaginationMeta = {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    const response: ApiResponse<T[]> = {
      success: true,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString(),
    };

    return res.status(200).json(response);
  }

  /**
   * Send internal server error (500)
   * @param res - Express response object
   * @param message - Error message
   * @param error - Error object
   */
  static serverError(
    res: Response,
    message = 'Internal server error',
    error?: any,
  ): Response {
    return this.error(res, message, 500, error);
  }
}

export default ResponseHandler;
