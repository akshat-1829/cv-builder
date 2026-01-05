// src/components/about/ValueCard.tsx

import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
  bgColor,
  iconColor,
}) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Avatar
        sx={{
          bgcolor: bgColor,
          width: 80,
          height: 80,
          mx: 'auto',
          mb: 2,
          '& svg': {
            color: iconColor,
          },
        }}
      >
        {icon}
      </Avatar>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="text.primary"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default ValueCard;
