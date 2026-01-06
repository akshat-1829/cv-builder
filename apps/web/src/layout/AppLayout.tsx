import { Box } from '@mui/material';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';
import { ScrollToTopWithLoader } from '../components/Common';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const path = window.location.pathname;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '100vw',
      }}
    >
      {path !== '/editor' && <AppHeader />}
      <ScrollToTopWithLoader />

      <Box sx={{ flex: 1 }}>{children}</Box>
      {path !== '/editor' && <AppFooter />}
    </Box>
  );
};

export default AppLayout;
