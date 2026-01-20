// src/components/Dashboard/DeleteConfirmDialog.tsx

import React, { useState } from 'react';
import { Box, TextField, Typography, Alert } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CommonDialog, DialogAction } from '@cv-builder/ui-theme';

interface DeleteConfirmDialogProps {
  open: boolean;
  cvTitle: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  cvTitle,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  const [confirmText, setConfirmText] = useState('');

  const handleConfirm = () => {
    onConfirm();
    setConfirmText('');
  };

  const isConfirmed = confirmText.toUpperCase() === 'DELETE';

  const actions: DialogAction[] = [
    {
      label: 'Cancel',
      onClick: onClose,
      variant: 'outlined',
      disabled: isDeleting,
    },
    {
      label: 'Delete Permanently',
      onClick: handleConfirm,
      variant: 'contained',
      color: 'error',
      disabled: !isConfirmed || isDeleting,
      loading: isDeleting,
      startIcon: <DeleteForeverIcon />,
    },
  ];

  return (
    <CommonDialog
      open={open}
      onClose={onClose}
      title="Delete CV"
      titleIcon={<WarningAmberIcon />}
      variant="danger"
      actions={actions}
      maxWidth="sm"
      warning="This action cannot be undone!"
      disableBackdropClick={isDeleting}
    >
      <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
        Are you sure you want to permanently delete:
      </Typography>

      <Box
        sx={{
          p: 2,
          bgcolor: 'error.50',
          borderRadius: 1,
          border: 1,
          borderColor: 'error.200',
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="error.main">
          "{cvTitle}"
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        This will permanently delete:
      </Typography>

      <Box component="ul" sx={{ pl: 2, mb: 2 }}>
        <Typography component="li" variant="body2" color="text.secondary">
          All CV content and formatting
        </Typography>
        <Typography component="li" variant="body2" color="text.secondary">
          Associated preview images
        </Typography>
        <Typography component="li" variant="body2" color="text.secondary">
          Version history
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          bgcolor: 'grey.100',
          borderRadius: 1,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Type <strong>DELETE</strong> to confirm
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="DELETE"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          disabled={isDeleting}
          autoFocus
          sx={{ mt: 1 }}
        />
      </Box>
    </CommonDialog>
  );
};

