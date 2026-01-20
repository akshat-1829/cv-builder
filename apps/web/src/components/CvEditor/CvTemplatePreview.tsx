// src/components/editor/TemplatePreview.tsx

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Paper, CircularProgress, Typography } from '@mui/material';
import {
  CVData,
  Education,
  Experience,
  Project,
  Skill,
  SocialProfile,
} from '@cv-builder/shared-types';
import CvTemplate1 from './CvTemplates/Template1';
import CvTemplate2 from './CvTemplates/Template2';
import CvTemplate3 from './CvTemplates/Template3';

interface TemplatePreviewProps {
  templateId: string;
  data: CVData;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  templateId,
  data,
}) => {
  const previewTemplate = (templateId: string) => {
    switch (templateId) {
      case 'temp_1':
        return <CvTemplate1 data={data} />;
      case 'temp_2':
        return <CvTemplate2 data={data} />;
      case 'temp_3':
        return <CvTemplate3 data={data} />;
      default:
        return <p>Template does not exist.</p>;
    }
  };

  if (!data) {
    console.error('No data provided to TemplatePreview');
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          minHeight: '600px',
        }}
      >
        <Typography color="error">No data available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '210mm',
          minHeight: '297mm',
          maxWidth: '100%',
          bgcolor: 'white',
          overflow: 'visible',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderRadius:0
        }}

      >
        {previewTemplate(templateId)}
      </Paper>
    </Box>
  );
};

export default TemplatePreview;
