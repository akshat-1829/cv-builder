// src/components/about/StatCard.tsx

import React from 'react';
import { Paper, Typography } from '@mui/material';

interface StatCardProps {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  bgColor,
  textColor,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: 'center',
        bgcolor: bgColor,
        borderRadius: 3,
      }}
    >
      <Typography variant="h3" fontWeight="bold" sx={{ color: textColor }}>
        {value}
      </Typography>
      <Typography variant="body1" sx={{ color: textColor, mt: 1 }}>
        {label}
      </Typography>
    </Paper>
  );
};

export default StatCard;
