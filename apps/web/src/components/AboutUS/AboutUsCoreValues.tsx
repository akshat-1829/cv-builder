// src/components/about/CoreValuesSection.tsx

import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import ValueCard from './ValueCard';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const values: Value[] = [
  {
    icon: <EmojiObjectsIcon sx={{ fontSize: 40 }} />,
    title: 'Innovation',
    description:
      'Continuously improving to deliver the best CV-building experience',
    bgColor: 'primary.light',
    iconColor: 'text.primary',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    title: 'User-Centric',
    description: 'Every feature is designed with your success in mind',
    bgColor: 'secondary.light',
    iconColor: 'common.white',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    title: 'Excellence',
    description: 'Committed to quality in design, functionality, and support',
    bgColor: 'primary.light',
    iconColor: 'text.primary',
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
    title: 'Accessibility',
    description: 'Making professional CV creation available to everyone',
    bgColor: 'secondary.light',
    iconColor: 'common.white',
  },
];

const CoreValuesSection: React.FC = () => {
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
          Our Core Values
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 5 }}
        >
          The principles that guide everything we do
        </Typography>

        <Grid container spacing={3}>
          {values.map((value, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <ValueCard
                icon={value.icon}
                title={value.title}
                description={value.description}
                bgColor={value.bgColor}
                iconColor={value.iconColor}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CoreValuesSection;
