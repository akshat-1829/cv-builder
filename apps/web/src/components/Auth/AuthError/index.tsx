// frontend/src/pages/AuthError.tsx

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AuthError = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const errorMessage = searchParams.get('message') || 'Authentication failed';

  useEffect(() => {
    // If in popup, notify parent
    if (window.opener) {
      window.opener.postMessage(
        { type: 'oauth-error', message: errorMessage },
        window.location.origin,
      );
      setTimeout(() => window.close(), 3000);
    }
  }, [errorMessage]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />

      <Typography variant="h4" gutterBottom fontWeight="bold">
        Authentication Failed
      </Typography>

      <Alert severity="error" sx={{ mb: 3, maxWidth: 500 }}>
        {errorMessage}
      </Alert>

      {window.opener ? (
        <Typography variant="body2" color="text.secondary">
          This window will close automatically...
        </Typography>
      ) : (
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          size="large"
        >
          Back to Login
        </Button>
      )}
    </Box>
  );
};

export default AuthError;
