import {
  Box,
  Grid,
  useTheme,
  // Alert,
} from '@mui/material';
import LoginImageSection from './LoginImageSection';
import LoginSignupFormSection from './LoginSignupFormSection';

const LoginContainer: React.FC = () => {
  const theme = useTheme();

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
