import {
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const AppHeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #F5F7FA 0%, #E2E8F0 100%)',
  display: 'flex',
  aligns: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'radial-gradient(circle at 20% 80%, rgba(244,196,48,0.1) 0%, transparent 50%)',
  },
}));


