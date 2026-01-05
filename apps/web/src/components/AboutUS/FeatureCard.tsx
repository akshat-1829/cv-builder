// src/components/about/FeatureCard.tsx

import React from 'react';
import { Paper, Box, Avatar, Typography } from '@mui/material';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: 'primary' | 'secondary';
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color = 'primary',
}) => {
  return (
    <Paper elevation={2} sx={{ p: 4, height: '100%', borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          sx={{
            bgcolor: `${color}.main`,
            mr: 2,
            width: 56,
            height: 56,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};

export default FeatureCard;
