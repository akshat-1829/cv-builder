// src/components/common/CommonDialog.tsx

import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {Button} from '../Button';
export type DialogVariant =
  | 'default'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info';

export interface DialogAction {
  label: string;
  onClick: () => void | Promise<void>;
  variant?: 'text' | 'outlined' | 'contained';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success';
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  title: string | ReactNode;
  titleIcon?: ReactNode;
  children: ReactNode;
  actions?: DialogAction[];
  variant?: DialogVariant;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  fullScreen?: boolean;
  showCloseButton?: boolean;
  disableBackdropClick?: boolean;
  loading?: boolean;
  error?: string;
  warning?: string;
  success?: string;
  info?: string;
  dividers?: boolean;
  contentPadding?: number | string;
}

export const CommonDialog: React.FC<CommonDialogProps> = ({
  open,
  onClose,
  title,
  titleIcon,
  children,
  actions = [],
  variant = 'default',
  maxWidth = 'sm',
  fullWidth = true,
  fullScreen = false,
  showCloseButton = true,
  disableBackdropClick = false,
  loading = false,
  error,
  warning,
  success,
  info,
  dividers = false,
  contentPadding,
}) => {
  const handleClose = (
    event: unknown,
    reason: 'backdropClick' | 'escapeKeyDown',
  ) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }
    onClose();
  };

  const getVariantColors = () => {
    switch (variant) {
      case 'danger':
        return {
          titleBg: 'error.50',
          titleColor: 'error.main',
          iconColor: 'error.main',
        };
      case 'warning':
        return {
          titleBg: 'warning.50',
          titleColor: 'warning.main',
          iconColor: 'warning.main',
        };
      case 'success':
        return {
          titleBg: 'success.50',
          titleColor: 'success.main',
          iconColor: 'success.main',
        };
      case 'info':
        return {
          titleBg: 'info.50',
          titleColor: 'info.main',
          iconColor: 'info.main',
        };
      default:
        return {
          titleBg: 'background.paper',
          titleColor: 'text.primary',
          iconColor: 'primary.main',
        };
    }
  };

  const colors = getVariantColors();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
    >
      {/* Title */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: colors.titleBg,
          py: 2,
          px: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          {titleIcon && (
            <Box sx={{ display: 'flex', color: colors.iconColor }}>
              {titleIcon}
            </Box>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: colors.titleColor,
            }}
          >
            {title}
          </Typography>
        </Box>

        {showCloseButton && (
          <IconButton
            onClick={onClose}
            size="small"
            disabled={loading}
            sx={{ ml: 1 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      {dividers && <Divider />}

      {/* Content */}
      <DialogContent
        dividers={dividers}
        sx={{
          py: contentPadding !== undefined ? contentPadding : 3,
          px: contentPadding !== undefined ? contentPadding : 3,
        }}
      >
        {/* Alert Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {warning && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {warning}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {info && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {info}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          children
        )}
      </DialogContent>

      {/* Actions */}
      {actions.length > 0 && (
        <>
          {dividers && <Divider />}
          <DialogActions sx={{ px: 3, py: 2 }}>
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant || 'contained'}
                color={action.color || 'primary'}
                disabled={action.disabled || loading}
                startIcon={
                  action.loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    action.startIcon
                  )
                }
                endIcon={action.endIcon}
              >
                {action.label}
              </Button>
            ))}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

