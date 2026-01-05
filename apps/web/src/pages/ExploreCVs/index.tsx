// src/pages/ExploreCVs.tsx

import React from 'react';

import { HeroSection } from '../../components/Dashboard';
import { Box } from '@mui/material';
import ExploreCvContainer from '../../components/ExploreCVs/ExploreCvContainer';


const ExploreCVsPage: React.FC = () => {


  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <HeroSection
        title="Find Your Perfect CV Template"
        subtitle="Browse professionally designed templates and create a standout CV in minutes" />
      <ExploreCvContainer />
    </Box>
  );
};

export default ExploreCVsPage;
