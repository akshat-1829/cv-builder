import { Box, Stack, Tab, Tabs } from '@mui/material';
import { LoginForm } from '../forms/LoginForm/LoginForm';
import {
  LoginFormValues,
  RegistrationFormValues,
} from '@cv-builder/shared-types';
import { RegistrationForm } from '../forms/RegistrationForm/RegistrationForm';
import { signInService, signUpService } from '../../services/auth.service';
import { use } from 'react';
import { useAuthStore } from '../../store/authSore';
import { useNavigate } from 'react-router-dom';

interface LoginSignupTabsProps {
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  isMobile: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
    {children}
  </Box>
);

const LoginSignupTabs = ({
  tabValue,
  handleTabChange,
  isMobile,
}: LoginSignupTabsProps) => {
  const navigate = useNavigate();
  const authState = useAuthStore();

  const onLoginSubmit = async (values: LoginFormValues) => {
    const res = await signInService({
      email: values.emailOrUsername,
      password: values.password,
    });
    if(res?.success){
      authState.login(res?.data?.data?.user, res?.data?.data?.token);
      navigate('/');
    }
  };

  const onSignupSubmit = async (values: RegistrationFormValues) => {
    const res = await signUpService(values);
    console.log(res);
    if (res?.success) {
      authState.login(res?.data?.data?.user, res?.data?.data?.token);
      navigate('/');
    }
  };
  return (
    <Stack spacing={2} direction="column" justifyContent="center">
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered={!isMobile}
        sx={{
          mb: 4,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1.1rem',
          },
        }}
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <LoginForm onSubmit={onLoginSubmit} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <RegistrationForm onSubmit={onSignupSubmit} />
      </TabPanel>
    </Stack>
  );
};

export default LoginSignupTabs;
