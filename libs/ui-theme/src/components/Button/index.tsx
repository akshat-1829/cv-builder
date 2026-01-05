// libs/ui-theme/components/Button/Button.tsx
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { FC } from 'react';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

export const Button: FC<CustomButtonProps> = ({
  loading,
  children,
  disabled,
  ...props
}) => {
  return (
    <MuiButton disabled={disabled || loading} {...props}>
      {loading ? 'Loading...' : children}
    </MuiButton>
  );
};
