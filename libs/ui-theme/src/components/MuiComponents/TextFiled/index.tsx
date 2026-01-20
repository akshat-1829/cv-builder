// libs/ui-theme/components/TextField/TextField.tsx
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import React from 'react';

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    return (
      <MuiTextField
        fullWidth
        variant="outlined"
        {...props}
        ref={ref}
      />
    );
  },
);
