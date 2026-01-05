// ui-theme/HeaderButton.tsx
import { Button, styled } from '@mui/material';

export const HeaderNavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  color: theme.palette.text.secondary,
  '&.MuiButton-root.MuiButton-textPrimary': {
    color: theme.palette.text.primary,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
