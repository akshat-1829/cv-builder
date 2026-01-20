import { CVData } from '@cv-builder/shared-types';
import { sendRequest, uploadFile } from '../utils/apiClient';
import { ApiEndpoints } from '../utils/apiEndpoints';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
} from 'react-query';

// ============ API Service Functions ============

/**
 * Upload profile image
 */
export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  return await uploadFile(ApiEndpoints.Upload.PROFILE_IMAGE, formData, {
    showSuccessToast: false,
    showErrorToast: true,
  });
};

/**
 * Create a new CV
 */
export const createCv = async (data: CVData & { templateId?: string }) => {
  console.log('CVData: ', data);
  return await sendRequest({
    url: ApiEndpoints.Cv.CREATE_CV,
    data,
    method: 'POST',
    successMessage: 'CV created successfully',
  });
};

/**
 * Get all CVs for the current user
 */
export const getAllCvs = async (params?: Record<string, unknown>) => {
  return await sendRequest({
    url: ApiEndpoints.Cv.GET_CV,
    method: 'GET',
    params: params || {},
    showSuccessToast: false,
  });
};

/**
 * Get a single CV by ID
 */
export const getCvById = async (id: string) => {
  return await sendRequest({
    url: `${ApiEndpoints.Cv.UPDATE_CV}/${id}`,
    method: 'GET',
    showSuccessToast: false,
  });
};

/**
 * Update a CV by ID
 */
export const updateCv = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<CVData & { templateId?: string }>;
}) => {
  return await sendRequest({
    url: `${ApiEndpoints.Cv.UPDATE_CV}/${id}`,
    method: 'PUT',
    data,
    successMessage: 'CV updated successfully',
  });
};

/**
 * Delete a CV by ID
 */
export const deleteCv = async (id: string) => {
  return await sendRequest({
    url: `${ApiEndpoints.Cv.DELETE_CV}/${id}`,
    method: 'DELETE',
    successMessage: 'CV deleted successfully',
  });
};

/**
 * Download CV as PDF
 */
export const downloadCv = async (id: string) => {
  return await fetch(`${ApiEndpoints.Cv.DELETE_CV}/${id}/download`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
};

// ============ Query Keys ============

export const CV_QUERY_KEYS = {
  all: ['cvs'] as const,
  lists: () => [...CV_QUERY_KEYS.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...CV_QUERY_KEYS.lists(), params] as const,
  details: () => [...CV_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CV_QUERY_KEYS.details(), id] as const,
} as const;

// ============ Custom Hooks - Mutations ============

/**
 * Hook to create a new CV
 * Automatically invalidates the CV list after successful creation
 */
export const useCreateCv = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    CVData & { templateId?: string },
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation(createCv, {
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate the CV list to fetch fresh data
      queryClient.invalidateQueries(CV_QUERY_KEYS.lists());

      // Call the custom onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('Failed to create CV:', error);
      options?.onError?.(error, variables, context);
    },
  });
};

/**
 * Hook to update an existing CV
 * Automatically invalidates the CV list and the specific CV detail
 */
export const useUpdateCv = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    { id: string; data: Partial<CVData & { templateId?: string }> },
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation(updateCv, {
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate both list and the specific CV detail
      queryClient.invalidateQueries(CV_QUERY_KEYS.lists());
      queryClient.invalidateQueries(CV_QUERY_KEYS.detail(variables.id));

      // Call the custom onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('Failed to update CV:', error);
      options?.onError?.(error, variables, context);
    },
  });
};

/**
 * Hook to delete a CV
 * Automatically invalidates the CV list after deletion
 */
export const useDeleteCv = (
  options?: UseMutationOptions<unknown, unknown, string, unknown>,
) => {
  const queryClient = useQueryClient();

  return useMutation(deleteCv, {
    ...options,
    onSuccess: (data, cvId, context) => {
      // Invalidate both list and the specific CV detail
      queryClient.invalidateQueries(CV_QUERY_KEYS.lists());
      queryClient.invalidateQueries(CV_QUERY_KEYS.detail(cvId));

      // Call the custom onSuccess if provided
      options?.onSuccess?.(data, cvId, context);
    },
    onError: (error, cvId, context) => {
      console.error('Failed to delete CV:', error);
      options?.onError?.(error, cvId, context);
    },
  });
};

/**
 * Hook to upload a profile image
 * Handles multipart/form-data request automatically
 */
export const useUploadProfileImage = (
  options?: UseMutationOptions<unknown, unknown, File, unknown>,
) => {
  return useMutation(uploadProfileImage, {
    ...options,
    onError: (error, file, context) => {
      console.error('Failed to upload profile image:', error);
      options?.onError?.(error, file, context);
    },
  });
};

// ============ Custom Hooks - Queries ============

/**
 * Hook to fetch all CVs for the current user
 * Includes automatic caching and refetch on window focus
 */
export const useGetAllCvs = (
  params?: Record<string, unknown>,
  options?: Record<string, unknown>,
) => {
  return useQuery(
    CV_QUERY_KEYS.list(params),
    () => getAllCvs(params),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      ...options,
    },
  );
};

/**
 * Hook to fetch a single CV by ID
 * Includes automatic caching and refetch on window focus
 */
export const useGetCvById = (
  id: string,
  options?: Record<string, unknown>,
) => {
  return useQuery(
    CV_QUERY_KEYS.detail(id),
    () => getCvById(id),
    {
      enabled: !!id, // Only run query if ID is provided
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      ...options,
    },
  );
};
