// src/components/Dashboard/MyCVs.tsx

import React, { useCallback, useMemo } from 'react';
import { Box, Grid, Typography, Container, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Button } from '@cv-builder/ui-theme';
import CVCard from './CvCard';
import { DeleteConfirmDialog, PaymentDialog, ErrorAlert, SnackbarNotification, LoadingState, EmptyState } from '../../Common';
import { useSnackbar, useDialog } from '../../../hooks';
import {
  useGetAllCvs,
  useDeleteCv,
  downloadCv,
} from '../../../services/cv.service';

interface CV {
  _id?: string;
  id?: string;
  title: string;
  templateId?: string;
  layout?: string;
  previewUrl?: string;
  createdAt: string;
  updatedAt: string;
  isPublic?: boolean;
}

type PaymentAction = 'share' | 'download' | null;

const MyCVs: React.FC = () => {
  const navigate = useNavigate();

  // Use React Query hooks for fetching and deleting CVs
  const { data: cvData, isLoading, error: queryError, refetch } = useGetAllCvs();
  console.log('cvData: ', cvData?.data);
  const deleteMutation = useDeleteCv();

  // Custom hooks for state management
  const { snackbar, closeSnackbar, showSuccess, showError } = useSnackbar();
  const paymentDialog = useDialog();
  const deleteDialog = useDialog();

  // Type-safe error handling
  const error = queryError as Error | null;
  const cvs: CV[] = useMemo(() => Array.isArray(cvData?.data?.data) ? cvData.data?.data : [], [cvData?.data?.data]);

  // Dialog state extracted to custom hook
  const paymentAction: PaymentAction = (paymentDialog.data as unknown as Record<string, unknown>)?.paymentAction as PaymentAction || null;
  const selectedCVId = (paymentDialog.data as unknown as Record<string, unknown>)?.selectedCVId as string || null;
  const deletingCVId = (deleteDialog.data as unknown as Record<string, unknown>)?.deletingCVId as string || null;

  const getCVId = useCallback((cv: CV) => cv._id || cv.id || '', []);

  const handleEdit = useCallback((cvId: string, templateId?: string) => {
    navigate(
      `/editor?template=${templateId || 'template_1'}&cvId=${cvId}`,
    );
  }, [navigate]);

  const handleShare = useCallback((cvId: string) => {
    paymentDialog.openDialog({ paymentAction: 'share', selectedCVId: cvId });
  }, [paymentDialog]);

  const handleDownload = useCallback((cvId: string) => {
    paymentDialog.openDialog({ paymentAction: 'download', selectedCVId: cvId });
  }, [paymentDialog]);

  const handleDelete = useCallback((cvId: string) => {
    deleteDialog.openDialog({ deletingCVId: cvId });
  }, [deleteDialog]);

  const handlePaymentSuccess = useCallback(async () => {
    if (!selectedCVId || !paymentAction) return;

    try {
      if (paymentAction === 'download') {
        const response = await downloadCv(selectedCVId);

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `CV-${selectedCVId}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
          showSuccess('CV downloaded successfully!');
        } else {
          throw new Error('Failed to download CV');
        }
      } else if (paymentAction === 'share') {
        const shareUrl = `${window.location.origin}/cv/preview/${selectedCVId}`;

        if (navigator.share) {
          await navigator.share({
            title: 'Check out my CV',
            text: 'View my professional CV',
            url: shareUrl,
          });
        } else {
          await navigator.clipboard.writeText(shareUrl);
          showSuccess('Share link copied to clipboard!');
        }
      }

      paymentDialog.closeDialog();
    } catch (error: unknown) {
      console.error('Error processing action:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete action. Please try again.';
      showError(errorMessage);
    }
  }, [selectedCVId, paymentAction, showSuccess, showError, paymentDialog]);

  const handleDeleteConfirm = useCallback(() => {
    if (!deletingCVId) return;

    deleteMutation.mutate(deletingCVId, {
      onSuccess: () => {
        deleteDialog.closeDialog();
        showSuccess('CV deleted successfully!');
      },
      onError: (error: unknown) => {
        console.error('Error deleting CV:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete CV. Please try again.';
        showError(errorMessage);
      },
    });
  }, [deletingCVId, deleteMutation, deleteDialog, showSuccess, showError]);

  const handleCreateNew = useCallback(() => {
    navigate('/explore-cvs');
  }, [navigate]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // Render loading state
  if (isLoading) {
    return <LoadingState loading={true}><div /></LoadingState>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack
        sx={{ p: 3, mb: 4 }}
        alignItems={cvs?.length > 0 ? 'space-between' : 'center'}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign={cvs?.length > 0 ? 'left' : 'center'}
              gutterBottom
            >
              My CVs
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={cvs?.length > 0 ? 'left' : 'center'}
            >
              Manage and customize your professional CVs
            </Typography>
          </Box>

          {cvs.length > 0 && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateNew}
              size="large"
            >
              Create New CV
            </Button>
          )}
        </Box>
      </Stack>

      {error && (
        <ErrorAlert
          message={error instanceof Error
            ? error.message
            : 'Failed to load your CVs. Please try again.'}
          onClose={handleRetry}
          onRetry={handleRetry}
          showRetry={true}
        />
      )}

      {cvs.length === 0 ? (
        <EmptyState
          title="No CVs created yet"
          description="Start building your professional CV with our beautiful templates"
          actionLabel="Create Your First CV"
          onAction={handleCreateNew}
        />
      ) : (
        <Grid container spacing={3}>
          {cvs.map((cv) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={getCVId(cv)}>
              <CVCard
                cv={{
                  id: getCVId(cv),
                  title: cv.title,
                  templateId: cv.layout || 'temp_1',
                  previewUrl: cv.previewUrl || '',
                  createdAt: cv.createdAt,
                  updatedAt: cv.updatedAt,
                }}
                onEdit={() =>
                  handleEdit(getCVId(cv), cv.layout)
                }
                onShare={() => handleShare(getCVId(cv))}
                onDownload={() => handleDownload(getCVId(cv))}
                onDelete={() => handleDelete(getCVId(cv))}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialogs */}
      <PaymentDialog
        open={paymentDialog.open}
        action={paymentAction}
        onClose={paymentDialog.closeDialog}
        onSuccess={handlePaymentSuccess}
      />

      {deletingCVId && (
        <DeleteConfirmDialog
          open={deleteDialog.open}
          cvTitle={cvs.find((cv) => getCVId(cv) === deletingCVId)?.title || 'CV'}
          onClose={deleteDialog.closeDialog}
          onConfirm={handleDeleteConfirm}
          isDeleting={deleteMutation.isLoading}
        />
      )}

      <SnackbarNotification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Container>
  );
};

export default React.memo(MyCVs);
