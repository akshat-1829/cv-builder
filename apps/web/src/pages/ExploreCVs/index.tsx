// src/pages/ExploreCVs.tsx

import React from 'react';

import { Box } from '@mui/material';
import ExploreCvContainer from '../../components/ExploreCVs/ExploreCvContainer';
import { AppHeroSection } from '@cv-builder/ui-theme';

const ExploreCVsPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppHeroSection
        title="Find Your Perfect CV Template"
        subtitle="Browse professionally designed templates and create a standout CV in minutes"
        backgroundImageUrl="https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VhcmNofGVufDB8fDB8fHww"
      />
      <ExploreCvContainer />
    </Box>
  );
};

export default ExploreCVsPage;
