// src/components/about/MissionSection.tsx

import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const MissionSection: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: 5,
          mb: 6,
          bgcolor: 'secondary.main',
          color: 'common.white',
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Our Mission
        </Typography>
        <Typography variant="h6" align="center" sx={{ mt: 2, lineHeight: 1.8 }}>
          To democratize access to professional career tools by providing an
          intuitive, powerful platform that helps every job seeker present their
          best self to potential employers. We believe everyone deserves a
          chance to showcase their talents with a stunning, professionally
          designed CV.
        </Typography>
      </Paper>
    </Container>
  );
};

export default MissionSection;
