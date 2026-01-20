import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authSore';
import { config } from '../config/env';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: config.apiBaseUrl || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      toast.error('Session expired. Please login again.');
    }
    return Promise.reject(error);
  },
);

interface SendRequestParams<T = any> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  customErrorHandler?: (error: AxiosError) => void;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Common function to make API requests
 */
export const sendRequest = async <T = any>({
  url,
  method = 'GET',
  data,
  params,
  headers,
  showSuccessToast = true,
  successMessage,
  showErrorToast = true,
  customErrorHandler,
}: SendRequestParams<T>): Promise<ApiResponse<T>> => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      data,
      params,
      headers,
    };

    const response: AxiosResponse<T> = await apiClient(config);
    console.log('response: ', response);

    // Handle success toast
    if (showSuccessToast && successMessage) {
      toast.success(successMessage);
    }

    return {
      success: true,
      data: response.data,
      message: successMessage,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
    }>;

    // Custom error handler
    if (customErrorHandler) {
      customErrorHandler(axiosError);
    } else if (showErrorToast) {
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        'Something went wrong. Please try again.';

      toast.error(errorMessage);
    }

    return {
      success: false,
      error: axiosError.response?.data?.message || axiosError.message,
    };
  }
};

/**
 * Upload file to the server
 * Automatically handles FormData and removes Content-Type header for proper multipart/form-data
 */
export const uploadFile = async (
  url: string,
  formData: FormData,
  options?: {
    showSuccessToast?: boolean;
    successMessage?: string;
    showErrorToast?: boolean;
  }
): Promise<ApiResponse> => {
  try {
    const token = useAuthStore.getState().token;
    const config: AxiosRequestConfig = {
      url,
      method: 'POST',
      data: formData,
      headers: {
        // Don't set Content-Type, let axios/browser set it for multipart/form-data
        'Authorization': token ? `Bearer ${token}` : '',
      },
    };

    const response: AxiosResponse = await apiClient(config);

    if (options?.showSuccessToast && options?.successMessage) {
      toast.success(options.successMessage);
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
    }>;

    if (options?.showErrorToast !== false) {
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        'File upload failed. Please try again.';

      toast.error(errorMessage);
    }

    return {
      success: false,
      error: axiosError.response?.data?.message || axiosError.message,
    };
  }
};

export default apiClient;
