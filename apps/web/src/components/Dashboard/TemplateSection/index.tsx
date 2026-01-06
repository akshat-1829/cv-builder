// pages/templates/index.tsx or components/templates/TemplateSelector.tsx

import React from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
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
    id: 'temp_1',
    name: 'Template 1',
    imagePath: '/assets/template_1.png',
    description: 'Professional design with modern layout',
    isPremium: false,
  },
  {
    id: 'temp_2',
    name: 'Template 2',
    imagePath: '/assets/template_2.png',
    description: 'Clean and minimal style',
    isPremium: false,
  },
  {
    id: 'temp_3',
    name: 'Template 3',
    imagePath: '/assets/template_3.png',
    description: 'Creative design with color accents',
    isPremium: true,
  },
];

export const TemplateSelection: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: 'secondary.light', p: 4 }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
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
            textAlign="center"
            gutterBottom
          >
            Our Most Popular Templates
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
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
      
      <Stack spacing={4} width="100%" alignItems="center">
        <AppTemplates templates={templates} />
      </Stack>
    </Container>
  );
};
