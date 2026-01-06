// Dashboard.tsx - Main dashboard component replicating the image layout
import React from 'react';
import { Box } from '@mui/material';
import { DashboardHeroSection, TemplateSelection } from '../../components/Dashboard';
import MyCVs from '../../components/Dashboard/MyCv';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'secondary.secondary', minHeight: '100vh', maxWidth:"100vw" }}>
      <DashboardHeroSection />
      <MyCVs />
      <TemplateSelection />
    </Box>
  );
};

export default Dashboard;
