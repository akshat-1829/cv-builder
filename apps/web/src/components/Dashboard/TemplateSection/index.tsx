// pages/templates/index.tsx or components/templates/TemplateSelector.tsx

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { AppTemplates } from '@cv-builder/ui-theme';

interface Template {
  id: string;
  name: string;
  imagePath: string;
  description: string;
  isPremium: boolean;
}

const templates: Template[] = [
  {
    id: 'template-1',
    name: 'Template 1',
    imagePath: '/assets/template_1.png',
    description: 'Professional design with modern layout',
    isPremium: false,
  },
  {
    id: 'template-2',
    name: 'Template 2',
    imagePath: '/assets/template_2.png',
    description: 'Clean and minimal style',
    isPremium: false,
  },
  {
    id: 'template-3',
    name: 'Template 3',
    imagePath: '/assets/template_3.png',
    description: 'Creative design with color accents',
    isPremium: true,
  },
];

export const TemplateSelection: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Choose a Template
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select a template to start building your CV
          </Typography>
        </Box>

        {/* <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && setViewMode(newMode)}
          size="small"
        >
          <ToggleButton value="grid">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup> */}
      </Box>

      <AppTemplates templates={templates} />
    </Container>
  );
};
