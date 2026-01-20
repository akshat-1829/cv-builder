// components/CVForm/CVFormContainer.tsx

import React, { useState, useEffect } from 'react';
import { Paper, Container, useMediaQuery, useTheme } from '@mui/material';
import CVFormContent from './CvFormContent';

interface CVFormContainerProps {
  onSubmit: (data: any) => Promise<void>;
  onStepChange?: () => void;
}

const CVFormContainer: React.FC<CVFormContainerProps> = ({
  onSubmit,
  onStepChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={2}
        sx={{
          p: isMobile ? '20px' : '32px',
          my: isMobile ? '16px' : '24px',
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        <CVFormContent
          onDirtyChange={setHasUnsavedChanges}
          // onStepChange={onStepChange}
        />
      </Paper>
    </Container>
  );
};

export default CVFormContainer;
