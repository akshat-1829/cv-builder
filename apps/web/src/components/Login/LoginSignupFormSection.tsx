// frontend/src/components/LoginSignupFormSection.tsx
import { checkPopupSupport } from '../../utils/browserCheck';
import theme from '@cv-builder/ui-theme';
import { Google, Facebook } from '@mui/icons-material';
import {
  useMediaQuery,
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import LoginSignupTabs from './LoginSignupTab';
import { useState } from 'react';
import {
  signInWithFacebookRedirect,
  signInWithGoogleRedirect,
} from '../../services/auth.service';

const LoginSignupFormSection = () => {
  const pathName = window.location.pathname;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(pathName === '/register' ? 1 : 0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid size={{ xs: 12, md: 6 }} alignItems="center">
      <Paper
        elevation={8}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 3,
          width: isMobile ? '80vw' : '30vw',
          display: 'flex',
          flexDirection: 'column',
          justifySelf: 'center',
        }}
      >
        <Box mb={4}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="text.primary"
            mb={1}
            textAlign="center"
          >
            {tabValue === 0 ? 'Welcome Back' : 'Join CV Builder'}
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {tabValue === 0
              ? 'Sign in to your account'
              : 'Create your account to get started'}
          </Typography>
        </Box>

        {/* Tabs */}
        <LoginSignupTabs
          handleTabChange={handleTabChange}
          isMobile={isMobile}
          tabValue={tabValue}
        />

        {/* Social login */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Continue with
          </Typography>

          <Box gap={2} display="flex" justifyContent="center">
            <Tooltip title="Sign in with Google">
              <IconButton
                size="large"
                onClick={signInWithGoogleRedirect}
                // disabled={}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 4,
                  gap:1,
                  width: 56,
                  height: 56,
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: '#4285f4',
                    bgcolor: 'rgba(66, 133, 244, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                }}
              >
                <Google />
                {/* <Typography variant='h6'>
                  Google
                </Typography> */}
              </IconButton>
            </Tooltip>

            {/* <Tooltip title="Sign in with Facebook">
              <IconButton
                size="large"
                onClick={signInWithFacebookRedirect}
                // disabled={isLoading}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  width: 56,
                  height: 56,
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: '#1877f2',
                    bgcolor: 'rgba(24, 119, 242, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                }}
              >
                <Facebook />
              </IconButton>
            </Tooltip> */}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default LoginSignupFormSection;
