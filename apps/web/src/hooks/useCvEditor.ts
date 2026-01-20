// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { CVData } from '@cv-builder/shared-types';
import { useCreateCv, useUpdateCv, useGetCvById } from '../services/cv.service';
import { useSnackbar, useBeforeUnload } from './index';

interface UseCvEditorReturn {
  templateId: string;
  cvId: string | null;
  initialFormValues: CVData | null;
  isLoadingCv: boolean;
  hasUnsavedChanges: boolean;
  exitDialogOpen: boolean;
  showMobilePreview: boolean;
  createMutation: ReturnType<typeof useCreateCv>;
  updateMutation: ReturnType<typeof useUpdateCv>;
  // snackbar: ReturnType<typeof useSnackbar>;
  setHasUnsavedChanges: (value: boolean) => void;
  setExitDialogOpen: (value: boolean) => void;
  setShowMobilePreview: (value: boolean) => void;
  handleSave: (values: CVData, helpers: FormikHelpers<CVData>) => Promise<void>;
  handleNavigateBack: () => void;
  handleConfirmExit: () => void;
}

/**
 * Custom Hook: useCvEditor
 * Manages CV Editor state, mutations, and navigation
 */
export const useCvEditor = (): UseCvEditorReturn => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // const snackbar = useSnackbar();

  const templateId = searchParams.get('template') || 'template_1';
  console.log('templateId: ', templateId);
  const cvId = searchParams.get('cvId');

  // React Query hooks
  const createMutation = useCreateCv();
  const updateMutation = useUpdateCv();
  const { data: existingCvData, isLoading: isLoadingCv } = useGetCvById(
    cvId || '',
    { enabled: !!cvId },
  );
  console.log('existingCvData: ', existingCvData);

  // Local state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState<CVData | null>(
    null,
  );

  // Use before unload hook
  useBeforeUnload(hasUnsavedChanges);

  // Initialize form values
  useEffect(() => {
    if (cvId && isLoadingCv) return;

    if (cvId && existingCvData) {
      setInitialFormValues(existingCvData?.data?.data?.data as CVData);
    } else if (!cvId) {
      setInitialFormValues({
        title: '',
        basicDetails: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          summary: '',
          image: '',
        },
        education: [
          {
            id: Math.random().toString(),
            degree: '',
            institution: '',
            percentage: 0,
            startDate: '',
            endDate: '',
          },
        ],
        experience: [],
        projects: [],
        skills: [],
        socialProfiles: [],
      });
    }
  }, [cvId, existingCvData, isLoadingCv]);

  // Handle post-navigation
  useEffect(() => {
    if (shouldNavigate) {
      setShouldNavigate(false);
      navigate(-1);
    }
  }, [shouldNavigate, navigate]);

  const handleSave = useCallback(
    async (values: CVData, formikHelpers: FormikHelpers<CVData>) => {
      try {
        const cvData = {
          title: values?.title,
          data: { ...values },
          layout: templateId,
        };

        if (cvId) {
          // Update existing CV
          updateMutation.mutate(
            { id: cvId, data: cvData },
            {
              onSuccess: () => {
                setHasUnsavedChanges(false);
                formikHelpers.resetForm({ values });
                console.log('here');
                navigate('/', { replace: true });
                // snackbar.showSuccess('CV updated successfully!');
              },
              // onError: (error: unknown) => {
              //   const errorMessage = error instanceof Error
              //     ? error.message
              //     : 'Failed to update CV';
              //   // snackbar.showError(errorMessage);
              // },
            },
          );
        } else {
          // Create new CV
          createMutation.mutate(cvData, {
            onSuccess: (result: unknown) => {
              setHasUnsavedChanges(false);
              formikHelpers.resetForm({ values });
              console.log("here");
              navigate('/', { replace: true });

            },
            onError: (error: unknown) => {
              const errorMessage =
              error instanceof Error ? error.message : 'Failed to create CV';
              snackbar.showError(errorMessage);
              console.log('errorMessage: ', errorMessage);
            },
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';
        snackbar.showError(errorMessage);
      }
    },
    [cvId, templateId, createMutation, updateMutation, navigate],
  );

  const handleNavigateBack = useCallback(() => {
    if (hasUnsavedChanges) {
      setExitDialogOpen(true);
    } else {
      navigate(-1);
    }
  }, [hasUnsavedChanges, navigate]);

  const handleConfirmExit = useCallback(() => {
    setExitDialogOpen(false);
    setShouldNavigate(true);
  }, []);

  return {
    templateId,
    cvId,
    initialFormValues,
    isLoadingCv,
    hasUnsavedChanges,
    exitDialogOpen,
    showMobilePreview,
    createMutation,
    updateMutation,
    // snackbar,
    setHasUnsavedChanges,
    setExitDialogOpen,
    setShowMobilePreview,
    handleSave,
    handleNavigateBack,
    handleConfirmExit,
  };
};

export default useCvEditor;
