// src/components/about/StatsSection.tsx

import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import StatCard from './StatCard';

interface Stat {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

const stats: Stat[] = [
  {
    value: '10K+',
    label: 'CVs Created',
    bgColor: 'primary.light',
    textColor: 'text.primary',
  },
  {
    value: '5K+',
    label: 'Happy Users',
    bgColor: 'secondary.light',
    textColor: 'common.white',
  },
  {
    value: '98%',
    label: 'Satisfaction Rate',
    bgColor: 'primary.light',
    textColor: 'text.primary',
  },
];

const StatsSection: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={index}>
              <StatCard
                value={stat.value}
                label={stat.label}
                bgColor={stat.bgColor}
                textColor={stat.textColor}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default StatsSection;
