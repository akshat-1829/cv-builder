// src/pages/CVEditor.tsx

import React, { useCallback, useMemo } from 'react';
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
import { Formik } from 'formik';
import { Button } from '@cv-builder/ui-theme';
import { cvFormValidationSchema } from '@cv-builder/shared-utils';
import CVEditorLayout from '../../components/CvEditor/CvEditorLayout';
import { SnackbarNotification, LoadingState } from '../../components/Common';
import { useCvEditor } from '../../hooks';
import { downloadCv } from '../../services/cv.service';

const CVEditor: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
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
  } = useCvEditor();

  const handlePreview = useCallback(() => {
    if (cvId) {
      window.open(`/cv/preview/${cvId}`, '_blank');
    }
  }, [cvId]);

  const handleDownload = useCallback(async () => {
    if (!cvId) return;

    try {
      const response = await downloadCv(cvId);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV-${cvId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        // snackbar.showSuccess('CV downloaded successfully!');
      } else {
        // snackbar.showError('Failed to download CV');
      }
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'An error occurred while downloading';
      // snackbar.showError(errorMessage);
    }
  }, [cvId]);

  const isLoading = useMemo(() => cvId && isLoadingCv, [cvId, isLoadingCv]);
  const isSaving = useMemo(() =>
    createMutation.isLoading || updateMutation.isLoading,
    [createMutation.isLoading, updateMutation.isLoading]
  );
  console.log('initialFormValues: ', initialFormValues);

  if (isLoading) {
    return <LoadingState loading={true}><Typography>Loading CV...</Typography></LoadingState>;
  }

  if (!initialFormValues) {
    return <LoadingState loading={true}><Typography>Preparing editor...</Typography></LoadingState>;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Back">
            <IconButton
              onClick={handleNavigateBack}
              disabled={isSaving}
              size="small"
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {cvId ? 'Edit CV' : 'Create New CV'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {cvId && (
            <>
              <Tooltip title="Download CV">
                <IconButton
                  onClick={handleDownload}
                  disabled={isSaving}
                  size="small"
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Preview">
                <IconButton
                  onClick={handlePreview}
                  disabled={isSaving}
                  size="small"
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          {!isMobile && (
            <Tooltip title="Preview on Mobile">
              <IconButton
                onClick={() => setShowMobilePreview(!showMobilePreview)}
                disabled={isSaving}
                size="small"
                color={showMobilePreview ? 'primary' : 'default'}
              >
                <PreviewIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={cvFormValidationSchema}
          onSubmit={handleSave}
          enableReinitialize
        >
          {({ values, isSubmitting }) => {
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

      {/* FAB Save Button */}
      <Tooltip title={isSaving ? 'Saving...' : 'Save CV'}>
        <Fab
          color="primary"
          aria-label="save"
          onClick={() => {
            const submitButton = document.querySelector(
              'button[type="submit"]'
            ) as HTMLButtonElement;
            submitButton?.click();
          }}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
          }}
          disabled={isSaving || !hasUnsavedChanges}
        >
          {isSaving ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <SaveIcon />
          )}
        </Fab>
      </Tooltip>

      {/* Exit Confirmation Dialog */}
      <Dialog
        open={exitDialogOpen}
        onClose={() => setExitDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Are you sure you want to leave without saving?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExitDialogOpen(false)} variant="outlined">
            Continue Editing
          </Button>
          <Button
            onClick={handleConfirmExit}
            variant="contained"
            color="error"
          >
            Discard Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      {/* <SnackbarNotification
        open={snackbar.snackbar.open}
        message={snackbar.snackbar.message}
        severity={snackbar.snackbar.severity}
        onClose={snackbar.closeSnackbar}
      /> */}
    </Box>
  );
};

export default React.memo(CVEditor);
