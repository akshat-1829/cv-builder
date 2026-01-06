// src/pages/CVEditor.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Fab,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PreviewIcon from '@mui/icons-material/Preview';
import { Formik, FormikHelpers } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { CVData } from '@cv-builder/shared-types';
import { Button } from '@cv-builder/ui-theme';
import { cvFormValidationSchema } from '@cv-builder/shared-utils';
import CVEditorLayout from '../../components/CvEditor/CvEditorLayout';

// Move initialValues OUTSIDE component to prevent re-creation
const getInitialValues = (): CVData => ({
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
      id: uuidv4(),
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

const CVEditor: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const templateId = searchParams.get('template') || 'template_1';
  const cvId = searchParams.get('cvId');

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialFormValues, setInitialFormValues] = useState<CVData | null>(
    null,
  );

  // Load existing CV data if editing
  useEffect(() => {
    const loadData = async () => {
      console.log('Loading CV data for ID:', cvId);
      setIsLoading(true);

      if (cvId) {
        try {
          const response = await fetch(`/api/cv/${cvId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Loaded CV data:', data);
            setInitialFormValues(data);
          } else {
            console.error('Failed to load CV');
            setInitialFormValues(getInitialValues());
          }
        } catch (error) {
          console.error('Error fetching CV:', error);
          setInitialFormValues(getInitialValues());
        }
      } else {
        console.log('Creating new CV with initial values');
        setInitialFormValues(getInitialValues());
      }

      setIsLoading(false);
    };

    loadData();
  }, [cvId]);

  // Prevent page refresh/close with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handle navigation after confirmation
  useEffect(() => {
    if (shouldNavigate) {
      setShouldNavigate(false);
      navigate(-1);
    }
  }, [shouldNavigate, navigate]);

  const handleSave = async (
    values: CVData,
    formikHelpers: FormikHelpers<CVData>,
  ) => {
    console.log('Saving CV with values:', values);
    setIsSaving(true);

    try {
      const url = cvId ? `/api/cv/${cvId}` : '/api/cv';
      const method = cvId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          templateId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('CV saved successfully:', result);
        setHasUnsavedChanges(false);
        formikHelpers.resetForm({ values });

        // If new CV, update URL with cvId
        if (!cvId && result.id) {
          navigate(`/editor?template=${templateId}&cvId=${result.id}`, {
            replace: true,
          });
        }
      } else {
        console.error('Failed to save CV');
      }
    } catch (error) {
      console.error('Error saving CV:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (cvId) {
      window.open(`/cv/preview/${cvId}`, '_blank');
    }
  };

  const handleDownload = async () => {
    if (!cvId) return;

    try {
      const response = await fetch(`/api/cv/${cvId}/download`, {
        method: 'POST',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV-${cvId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
    }
  };

  const handleNavigation = () => {
    if (hasUnsavedChanges) {
      setExitDialogOpen(true);
    } else {
      navigate(-1);
    }
  };

  const handleExitConfirm = () => {
    setHasUnsavedChanges(false);
    setExitDialogOpen(false);
    setShouldNavigate(true);
  };

  const handleExitCancel = () => {
    setExitDialogOpen(false);
  };

  const handleBack = () => {
    handleNavigation();
  };

  // Show loading state while fetching data
  if (isLoading || !initialFormValues) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Loading editor...</Typography>
      </Box>
    );
  }

  console.log('=== Rendering CVEditor ===');
  console.log('Initial Form Values:', initialFormValues);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <Paper
        elevation={2}
        sx={{
          px: { xs: 2, md: 3 },
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 0,
          bgcolor: 'background.paper',
          zIndex: 1000,
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}
        >
          <IconButton onClick={handleBack} size={isMobile ? 'small' : 'medium'}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              fontWeight="bold"
            >
              CV Editor
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isMobile && (
            <>
              <Tooltip title="Preview in New Tab">
                <IconButton onClick={handlePreview} disabled={!cvId}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download PDF">
                <IconButton onClick={handleDownload} disabled={!cvId}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={isSaving || !hasUnsavedChanges}
            size={isMobile ? 'small' : 'medium'}
            sx={{ ml: 1 }}
            type="submit"
            form="cv-form"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Paper>

      {/* Editor Layout */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={cvFormValidationSchema}
          onSubmit={handleSave}
          validateOnChange={false}
          validateOnBlur={true}
          enableReinitialize={false}
        >
          {(formikProps) => {
            console.log('=== Formik Render Props ===');
            console.log('Formik values:', formikProps.values);
            console.log('Formik dirty:', formikProps.dirty);

            return (
              <CVEditorLayout
                templateId={templateId}
                showMobilePreview={showMobilePreview}
                setShowMobilePreview={setShowMobilePreview}
                onDirtyChange={setHasUnsavedChanges}
              />
            );
          }}
        </Formik>
      </Box>

      {/* Mobile Preview Toggle FAB */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
          onClick={() => setShowMobilePreview(!showMobilePreview)}
        >
          <PreviewIcon />
        </Fab>
      )}

      {/* Exit Confirmation Dialog */}
      <Dialog open={exitDialogOpen} onClose={handleExitCancel}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Are you sure you want to leave? All
            unsaved changes will be lost.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExitCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleExitConfirm} variant="contained" color="error">
            Leave Without Saving
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CVEditor;
