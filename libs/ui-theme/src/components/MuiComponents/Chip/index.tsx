import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';

interface CommonChipProps extends Omit<ChipProps, 'variant'> {
  customColor?: string;
}

export const Chip: React.FC<CommonChipProps> = ({
  customColor,
  sx,
  ...props
}) => {
  const chipSx = {
    marginTop: '0.3rem !important',
    ...(customColor && {
      borderColor: customColor,
      color: customColor,
    }),
    ...sx,
  };

  return <MuiChip variant="outlined" sx={chipSx} {...props} />;
};

