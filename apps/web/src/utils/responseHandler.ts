import { toast, ToastOptions } from 'react-toastify';
import { AxiosError } from 'axios';

interface ApiError {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

const defaultToastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Handle successful API responses
 */
export const handleSuccess = (
  message: string,
  options?: ToastOptions,
): void => {
  toast.success(message, { ...defaultToastConfig, ...options });
};

/**
 * Handle API errors with appropriate toast messages
 */
export const handleError = (
  error: AxiosError<ApiError> | Error | unknown,
  customMessage?: string,
): void => {
  if (error instanceof Error && 'response' in error) {
    const axiosError = error as AxiosError<ApiError>;
    const response = axiosError.response;

    switch (response?.status) {
      case 400:
        // Handle validation errors
        if (response.data?.errors) {
          Object.values(response.data.errors).forEach((errorMessages) => {
            errorMessages.forEach((msg) =>
              toast.error(msg, defaultToastConfig),
            );
          });
        } else {
          toast.error(
            response.data?.message || customMessage || 'Bad request',
            defaultToastConfig,
          );
        }
        break;

      case 401:
        toast.error('Unauthorized. Please login again.', defaultToastConfig);
        break;

      case 403:
        toast.error('Access forbidden.', defaultToastConfig);
        break;

      case 404:
        toast.error(
          response.data?.message || 'Resource not found',
          defaultToastConfig,
        );
        break;

      case 409:
        toast.error(
          response.data?.message || 'Conflict error',
          defaultToastConfig,
        );
        break;

      case 422:
        toast.error(
          response.data?.message || 'Validation failed',
          defaultToastConfig,
        );
        break;

      case 500:
        toast.error(
          'Internal server error. Please try again later.',
          defaultToastConfig,
        );
        break;

      default:
        toast.error(
          response?.data?.message || customMessage || 'An error occurred',
          defaultToastConfig,
        );
    }
  } else {
    toast.error(
      customMessage || 'Network error. Please check your connection.',
      defaultToastConfig,
    );
  }
};

/**
 * Handle info messages
 */
export const handleInfo = (message: string, options?: ToastOptions): void => {
  toast.info(message, { ...defaultToastConfig, ...options });
};

/**
 * Handle warning messages
 */
export const handleWarning = (
  message: string,
  options?: ToastOptions,
): void => {
  toast.warn(message, { ...defaultToastConfig, ...options });
};

/**
 * Promise-based toast for async operations
 */
export const handlePromise = async <T>(
  promise: Promise<T>,
  messages: {
    pending: string;
    success: string;
    error: string;
  },
): Promise<T> => {
  const result = await toast.promise(
    promise,
    {
      pending: messages.pending,
      success: messages.success,
      error: messages.error,
    },
    defaultToastConfig,
  );
  return result as T;
};
