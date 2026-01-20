import React from 'react';
import { Box, Snackbar, Alert, SnackbarProps } from '@mui/material';

interface SnackbarNotificationProps {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  autoCloseDuration?: number;
  position?: SnackbarProps['anchorOrigin'];
}

/**
 * Reusable Snackbar Notification Component
 * Centralized notification display with configurable severity and position
 */
export const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({
  open,
  message,
  severity = 'info',
  onClose,
  autoCloseDuration = 4000,
  position = { vertical: 'bottom', horizontal: 'left' },
}) => {
  return (
    <Snackbar
      open={open}
      autoCloseDuration={autoCloseDuration}
      onClose={onClose}
      anchorOrigin={position}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
