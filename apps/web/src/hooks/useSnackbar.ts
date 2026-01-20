import { useState, useCallback } from 'react';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

/**
 * Custom Hook: useSnackbar
 * Manages snackbar/toast notifications state and actions
 */
export const useSnackbar = (initialSeverity: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: initialSeverity,
  });

  const showSnackbar = useCallback(
    (message: string, severity: SnackbarState['severity'] = 'info') => {
      setSnackbar({
        open: true,
        message,
        severity,
      });
    },
    []
  );

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const showSuccess = useCallback((message: string) => {
    showSnackbar(message, 'success');
  }, [showSnackbar]);

  const showError = useCallback((message: string) => {
    showSnackbar(message, 'error');
  }, [showSnackbar]);

  const showWarning = useCallback((message: string) => {
    showSnackbar(message, 'warning');
  }, [showSnackbar]);

  return {
    snackbar,
    showSnackbar,
    closeSnackbar,
    showSuccess,
    showError,
    showWarning,
  };
};

export default useSnackbar;
