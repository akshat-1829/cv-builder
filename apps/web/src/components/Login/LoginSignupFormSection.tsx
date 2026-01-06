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
} from '@mui/material';
import LoginSignupTabs from './LoginSignupTab';
import { useState } from 'react';

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
          <Divider sx={{ my: 3 }}>OR</Divider>
          <Box gap={2} display="flex" justifyContent="center">
            <IconButton
              size="large"
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                width: 56,
                height: 56,
              }}
            >
              <Google />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                width: 56,
                height: 56,
              }}
            >
              <Facebook />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default LoginSignupFormSection;
