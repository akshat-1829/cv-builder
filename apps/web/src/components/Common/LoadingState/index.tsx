import React from 'react';
import { Box, CircularProgress, Typography, BoxProps } from '@mui/material';

interface LoadingStateProps extends BoxProps {
  loading: boolean;
  children: React.ReactNode;
  message?: string;
  minHeight?: string | number;
  spinner?: boolean;
}

/**
 * Reusable Loading State Component
 * Shows loading spinner and message while content is being fetched
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  children,
  message = 'Loading...',
  minHeight = '60vh',
  spinner = true,
  ...props
}) => {
  if (!loading) {
    return children as React.ReactElement;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight,
        gap: 2,
      }}
      {...props}
    >
      {spinner && <CircularProgress size={60} />}
      {message && (
        <Typography color="text.secondary" variant="body1">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingState;
