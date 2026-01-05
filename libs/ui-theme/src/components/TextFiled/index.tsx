// libs/ui-theme/components/TextField/TextField.tsx
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

export const TextField: FC<TextFieldProps> = (props) => {
  return (
    <MuiTextField
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};
