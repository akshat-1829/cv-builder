// src/pages/AboutUs.tsx

import React from 'react';
import { Box } from '@mui/material';

import { HeroSection } from '../../components/Dashboard';
import AboutUsContainer from '../../components/AboutUS/AboutUsContainer';


const AboutUs: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <HeroSection
        title="About CV Builder"
        subtitle="Empowering job seekers to create professional CVs that open doors to new opportunities" />
      <AboutUsContainer />
    </Box>
  );
};

export default AboutUs;
