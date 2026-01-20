import { useEffect } from 'react';

/**
 * Custom Hook: useBeforeUnload
 * Handles unsaved changes warning when leaving page
 */
export const useBeforeUnload = (hasUnsavedChanges: boolean, message = 'You have unsaved changes. Are you sure you want to leave?') => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, message]);
};

export default useBeforeUnload;
