// ui-theme/FooterStyles.tsx
import { Box, styled, Container } from '@mui/material';

export const FooterContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.common.white,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
  },
}));

export const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
}));

export const FooterLink = styled('a')(({ theme }) => ({
  display: 'block',
  color: theme.palette.common.white,
  textDecoration: 'none',
  fontSize: '0.9rem',
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));
