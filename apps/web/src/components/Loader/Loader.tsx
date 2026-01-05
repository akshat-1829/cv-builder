// apps/cv-builder/src/components/LoadingSpinner/LoadingSpinner.tsx
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      gap: 2,
    }}
  >
    <CircularProgress size={60} />
    <Typography variant="h6">Loading...</Typography>
  </Box>
);

export default Loader;
