// ui-theme/AppBarHeader.tsx (scroll-aware)
import { AppBar, Toolbar, styled, alpha } from '@mui/material';

interface ScrollAppBarProps {
  isScrolled: boolean;
}

export const AppBarHeader = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<ScrollAppBarProps>(({ theme, isScrolled }) => ({
  position: 'fixed', // Changed from sticky for smoother scroll
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar + 100,

  backgroundColor: isScrolled ? theme.palette.background.paper : 'transparent',

  backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
  WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',

  boxShadow: isScrolled
    ? '0 4px 20px rgba(15, 23, 42, 0.12)'
    : '0 2px 12px rgba(0, 0, 0, 0.08)',

  color: theme.palette.text.primary,

  transition: theme.transitions.create(
    ['background-color', 'box-shadow', 'backdrop-filter'],
    {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    },
  ),
}));

export const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 72,
  paddingInline: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    paddingInline: theme.spacing(6),
  },
}));
