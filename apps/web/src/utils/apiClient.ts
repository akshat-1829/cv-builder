import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authSore';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
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
  showSuccessToast = false,
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

export default apiClient;
