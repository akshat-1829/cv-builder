// src/components/about/StorySection.tsx

import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const StorySection: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
        >
          Our Story
        </Typography>
        <Divider
          sx={{ mb: 3, borderColor: 'primary.main', borderWidth: 2, width: 80 }}
        />
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
        >
          CV Builder was born from a simple observation: creating a professional
          CV shouldn't be complicated, time-consuming, or expensive. We've seen
          countless talented individuals struggle with formatting, design, and
          presentation—losing opportunities simply because their CVs didn't
          stand out.
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
        >
          We created CV Builder to change that. Our platform combines beautiful
          design with powerful functionality, making it easy for anyone to
          create, customize, and share professional CVs that get results.
          Whether you're a fresh graduate, a seasoned professional, or someone
          making a career change, we're here to help you tell your story.
        </Typography>
      </Box>
    </Container>
  );
};

export default StorySection;
