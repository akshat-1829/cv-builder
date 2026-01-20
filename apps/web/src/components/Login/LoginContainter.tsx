import {
  Box,
  Grid,
  useTheme,
  // Alert,
} from '@mui/material';
import LoginImageSection from './LoginImageSection';
import LoginSignupFormSection from './LoginSignupFormSection';
import { useAuthStore } from '../../store/authSore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginContainer: React.FC = () => {
  const authState = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      navigate('/', {
        replace: true,
      });
    }
  }, [authState?.isAuthenticated, navigate]);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        // alignItems: 'center',
        width: '100%',
        // py: 6,
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{ minHeight: '100vh', minWidth: '100%' }}
      >
        <LoginImageSection />
        <LoginSignupFormSection />
      </Grid>
    </Box>
  );
};

export default LoginContainer;
