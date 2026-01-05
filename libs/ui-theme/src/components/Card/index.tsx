// libs/ui-theme/components/Card/Card.tsx
import { Card as MuiCard, CardContent, CardActions, CardProps } from '@mui/material';
import { FC, ReactNode } from 'react';

interface CustomCardProps extends CardProps {
  actions?: ReactNode;
  children: ReactNode;
}

export const Card: FC<CustomCardProps> = ({ children, actions, ...props }) => {
  return (
    <MuiCard {...props} >
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};
