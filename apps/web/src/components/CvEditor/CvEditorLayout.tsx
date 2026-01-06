// src/components/editor/CVEditorLayout.tsx

import React, { useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useFormikContext } from 'formik';
import { CVData } from '@cv-builder/shared-types';
import CvTemplatePreview from './CvTemplatePreview';
import CVFormContainer from '../forms/CV/CvFormContainer';

interface CVEditorLayoutProps {
  templateId: string;
  showMobilePreview: boolean;
  setShowMobilePreview: (show: boolean) => void;
  onDirtyChange: (isDirty: boolean) => void;
}

const CVEditorLayout: React.FC<CVEditorLayoutProps> = ({
  templateId,
  showMobilePreview,
  setShowMobilePreview,
  onDirtyChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { values, dirty, submitForm } = useFormikContext<CVData>();

  useEffect(() => {
    onDirtyChange(dirty);
  }, [dirty, onDirtyChange]);

  console.log('=== CVEditorLayout Render ===');
  console.log('Values from context:', values);

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Left Panel - Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '45%' },
          display: { xs: showMobilePreview ? 'none' : 'block', md: 'block' },
          overflow: 'auto',
          bgcolor: 'background.default',
          borderRight: { md: 1 },
          borderColor: 'divider',
        }}
      >
        <CVFormContainer onSubmit={submitForm} />
      </Box>

      {/* Right Panel - Template Preview */}
      <Box
        sx={{
          width: { xs: '100%', md: '55%' },
          display: { xs: showMobilePreview ? 'block' : 'none', md: 'block' },
          overflow: 'auto',
          bgcolor: 'grey.200',
          p: { xs: 2, md: 3 },
        }}
      >
        <CvTemplatePreview templateId={templateId} data={values} />
      </Box>
    </Box>
  );
};

export default CVEditorLayout;
