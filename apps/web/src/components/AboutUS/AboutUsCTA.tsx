// src/components/about/CTASection.tsx

import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: 'center',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="common.white"
          gutterBottom
        >
          Ready to Build Your Future?
        </Typography>
        <Typography
          variant="h6"
          color="common.white"
          sx={{ mb: 3, opacity: 0.95 }}
        >
          Join thousands of professionals who have already created their perfect
          CV
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            component={Link}
            to="/register"
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: 'common.white',
              color: 'text.primary',
              borderRadius: 2,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
              '&:hover': {
                bgcolor: 'background.default',
              },
            }}
          >
            Get Started Free
          </Box>
          <Box
            component={Link}
            to="/explore"
            sx={{
              px: 4,
              py: 1.5,
              border: 2,
              borderColor: 'common.white',
              color: 'common.white',
              borderRadius: 2,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Explore Templates
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CTASection;
