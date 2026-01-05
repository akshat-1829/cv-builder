// src/components/about/FeaturesSection.tsx

import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import SpeedIcon from '@mui/icons-material/Speed';
import WorkIcon from '@mui/icons-material/Work';
import SecurityIcon from '@mui/icons-material/Security';
import FeatureCard from './FeatureCard';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'secondary';
}

const features: Feature[] = [
  {
    icon: <PaletteIcon />,
    title: 'Professional Templates',
    description:
      'Access beautifully designed CV templates crafted by professionals. Each template is fully customizable with colors, fonts, and layouts to match your personal brand.',
    color: 'primary',
  },
  {
    icon: <SpeedIcon />,
    title: 'Quick & Easy Creation',
    description:
      'Build your CV in minutes with our intuitive step-by-step editor. See your changes in real-time as you fill in your information, education, experience, and skills.',
    color: 'secondary',
  },
  {
    icon: <WorkIcon />,
    title: 'Multiple CVs',
    description:
      'Create and manage multiple CVs for different job applications. Tailor each CV to specific roles and industries to maximize your chances of success.',
    color: 'primary',
  },
  {
    icon: <SecurityIcon />,
    title: 'Secure & Private',
    description:
      'Your personal information is protected with industry-standard security. Create your account and access your CVs anytime, anywhere, on any device.',
    color: 'secondary',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          align="center"
        >
          What We Offer
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 5 }}
        >
          Everything you need to create a CV that stands out
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FeaturesSection;
