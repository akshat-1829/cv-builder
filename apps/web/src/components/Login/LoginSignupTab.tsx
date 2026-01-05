import { Box, Stack, Tab, Tabs } from "@mui/material";
import { LoginForm } from "../forms/LoginForm/LoginForm";
import { LoginFormValues, RegistrationFormValues } from "@cv-builder/shared-types";
import { RegistrationForm } from "../forms/RegistrationForm/RegistrationForm";

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

const LoginSignupTabs = ({ tabValue, handleTabChange,isMobile }:LoginSignupTabsProps) => {
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
        <LoginForm
          onSubmit={function (values: LoginFormValues): Promise<void> {
            throw new Error('Function not implemented.');
          }}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <RegistrationForm
          onSubmit={function (values: RegistrationFormValues): Promise<void> {
            throw new Error('Function not implemented.');
          }}
        />
      </TabPanel>
    </Stack>
  );
}

export default LoginSignupTabs;
