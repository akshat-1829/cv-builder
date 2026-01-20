import React from 'react';
import { Box, Typography, Button, BoxProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface EmptyStateProps extends BoxProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

/**
 * Reusable Empty State Component
 * Shows when list is empty with call-to-action button
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel = 'Create New',
  onAction,
  icon,
  ...props
}) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 2,
        bgcolor: 'background.paper',
      }}
      {...props}
    >
      {icon && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          {icon}
        </Box>
      )}
      <Typography variant="h5" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {description}
      </Typography>
      {onAction && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAction}
          size="large"
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
