import { Box } from "@mui/material";
import AppFooter from "../components/Footer";
import AppHeader from "../components/Header";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader />
      <Box sx={{ flex: 1 }}>{children}</Box>
      <AppFooter />
    </Box>
  );
}

export default AppLayout;
