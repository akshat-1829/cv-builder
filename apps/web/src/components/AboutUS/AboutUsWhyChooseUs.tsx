// src/components/about/WhyChooseUsSection.tsx

import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';

interface Reason {
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    title: 'Save Time',
    description:
      'Create professional CVs in minutes, not hours. Our intuitive interface and pre-designed templates eliminate the guesswork.',
  },
  {
    title: 'Stand Out',
    description:
      'Make a lasting impression with beautifully designed CVs that showcase your skills and experience in the best possible light.',
  },
  {
    title: 'Get Hired',
    description:
      'Increase your chances of landing interviews with CVs that are optimized for both human recruiters and applicant tracking systems.',
  },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 5, mb: 6, borderRadius: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          align="center"
        >
          Why Choose CV Builder?
        </Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {reasons.map((reason, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="secondary.main"
                  gutterBottom
                >
                  {reason.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {reason.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default WhyChooseUsSection;
