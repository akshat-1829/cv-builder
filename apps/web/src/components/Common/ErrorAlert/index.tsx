import React from 'react';
import { Box, Button, Alert, AlertProps } from '@mui/material';

interface ErrorAlertProps extends Omit<AlertProps, 'onClose'> {
  message: string;
  onClose: () => void;
  onRetry?: () => void;
  showRetry?: boolean;
}

/**
 * Reusable Error Alert Component
 * Consolidated error display with optional retry functionality
 */
export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onClose,
  onRetry,
  showRetry = false,
  severity = 'error',
  ...props
}) => {
  return (
    <Alert
      severity={severity}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      }}
      {...props}
    >
      <Box sx={{ flex: 1 }}>{message}</Box>
      <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
        {showRetry && onRetry && (
          <Button
            color="inherit"
            size="small"
            onClick={onRetry}
            sx={{
              textDecoration: 'underline',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' },
            }}
          >
            Retry
          </Button>
        )}
      </Box>
    </Alert>
  );
};

export default ErrorAlert;
