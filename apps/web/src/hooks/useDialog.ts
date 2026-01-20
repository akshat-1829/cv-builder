import { useState, useCallback } from 'react';

interface DialogState {
  open: boolean;
  data?: unknown;
}

/**
 * Custom Hook: useDialog
 * Manages dialog open/close state with optional data passing
 */
export const useDialog = () => {
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    data: undefined,
  });

  const openDialog = useCallback((data?: unknown) => {
    setDialog({
      open: true,
      data,
    });
  }, []);

  const closeDialog = useCallback(() => {
    setDialog({
      open: false,
      data: undefined,
    });
  }, []);

  return {
    open: dialog.open,
    data: dialog.data,
    openDialog,
    closeDialog,
  };
};

export default useDialog;
