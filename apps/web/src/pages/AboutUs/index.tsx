// src/pages/AboutUs.tsx

import React from 'react';
import { Box } from '@mui/material';

import AboutUsContainer from '../../components/AboutUS/AboutUsContainer';
import { AppHeroSection } from '@cv-builder/ui-theme';


const AboutUs: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <AppHeroSection
        title="About CV Builder"
        subtitle="Empowering job seekers to create professional CVs that open doors to new opportunities"
        backgroundImageUrl="https://plus.unsplash.com/premium_photo-1677087121017-b779a16ff921?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWJvdXQlMjB1c3xlbnwwfHwwfHx8MA%3D%3D"
      />
      <AboutUsContainer />
    </Box>
  );
};

export default AboutUs;
