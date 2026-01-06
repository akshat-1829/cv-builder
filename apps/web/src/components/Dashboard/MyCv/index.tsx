// src/components/Dashboard/MyCVs.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Paper,
  Snackbar,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Button } from '@cv-builder/ui-theme';
import CVCard from './CvCard';
import { DeleteConfirmDialog, PaymentDialog } from '../../Common';

interface CV {
  id: string;
  title: string;
  templateId: string;
  previewUrl: string;
  createdAt: string;
  updatedAt: string;
}

type PaymentAction = 'share' | 'download' | null;

const MyCVs: React.FC = () => {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentAction, setPaymentAction] = useState<PaymentAction>(null);
  const [selectedCVId, setSelectedCVId] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingCVId, setDeletingCVId] = useState<string | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    // fetchMyCVs();
    setLoading(false);
  }, []);

  const fetchMyCVs = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/cv/my-cvs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CVs');
      }

      const data = await response.json();
      setCvs(data.cvs);
    } catch (err: any) {
      console.error('Error fetching CVs:', err);
      setError(err.message || 'Failed to load your CVs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cvId: string, templateId: string) => {
    navigate(`/editor?template=${templateId}&cvId=${cvId}`);
  };

  const handleShare = (cvId: string) => {
    setSelectedCVId(cvId);
    setPaymentAction('share');
    setPaymentDialogOpen(true);
  };

  const handleDownload = (cvId: string) => {
    setSelectedCVId(cvId);
    setPaymentAction('download');
    setPaymentDialogOpen(true);
  };

  const handleDelete = (cvId: string) => {
    setDeletingCVId(cvId);
    setDeleteDialogOpen(true);
  };

  const handlePaymentSuccess = async () => {
    if (!selectedCVId || !paymentAction) return;

    try {
      if (paymentAction === 'download') {
        const response = await fetch(`/api/cv/${selectedCVId}/download`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `CV-${selectedCVId}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
          setSnackbar({
            open: true,
            message: 'CV downloaded successfully!',
            severity: 'success',
          });
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
          setSnackbar({
            open: true,
            message: 'Share link copied to clipboard!',
            severity: 'success',
          });
        }
      }

      setPaymentDialogOpen(false);
      setSelectedCVId(null);
      setPaymentAction(null);
    } catch (error) {
      console.error('Error processing action:', error);
      setSnackbar({
        open: true,
        message: 'Failed to complete action. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCVId) return;

    try {
      const response = await fetch(`/api/cv/${deletingCVId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setCvs(cvs.filter((cv) => cv.id !== deletingCVId));
        setDeleteDialogOpen(false);
        setDeletingCVId(null);
        setSnackbar({
          open: true,
          message: 'CV deleted successfully!',
          severity: 'success',
        });
      } else {
        throw new Error('Failed to delete CV');
      }
    } catch (error) {
      console.error('Error deleting CV:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete CV. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCreateNew = () => {
    navigate('/explore-cvs');
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
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
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {cvs.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No CVs created yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Start building your professional CV with our beautiful templates
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            size="large"
          >
            Create Your First CV
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {cvs.map((cv) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cv.id}>
              <CVCard
                cv={cv}
                onEdit={() => handleEdit(cv.id, cv.templateId)}
                onShare={() => handleShare(cv.id)}
                onDownload={() => handleDownload(cv.id)}
                onDelete={() => handleDelete(cv.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <PaymentDialog
        open={paymentDialogOpen}
        action={paymentAction}
        onClose={() => {
          setPaymentDialogOpen(false);
          setSelectedCVId(null);
          setPaymentAction(null);
        }}
        onSuccess={handlePaymentSuccess}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        cvTitle={cvs.find((cv) => cv.id === deletingCVId)?.title || ''}
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeletingCVId(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyCVs;
