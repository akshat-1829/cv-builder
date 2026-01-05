// Dashboard.tsx - Main dashboard component replicating the image layout
import React from 'react';
import { Box } from '@mui/material';
import { HeroSection, TemplateSelection } from '../../components/Dashboard';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'secondary.secondary', minHeight: '100vh' }}>
      <HeroSection />
      <TemplateSelection />
    </Box>
  );
};

export default Dashboard;
