// frontend/src/pages/AuthCallback.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useAuthStore } from '../../../store/authSore';
import { getCurrentUserService } from '../../../services/auth.service';

const AuthCallback = () => {
  const authState = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>(
    'processing',
  );
  const [message, setMessage] = useState('Completing authentication...');

  useEffect(() => {
    console.log('🎯 AuthCallback mounted');
    console.log('   URL:', window.location.href);
    console.log('   Has opener:', !!window.opener);
    console.log('   Opener closed:', window.opener?.closed);

    const token = searchParams.get('token');
    const provider = searchParams.get('provider');
    const error = searchParams.get('message');

    console.log('   Token:', token ? 'Present' : 'None');
    console.log('   Provider:', provider);
    console.log('   Error:', error || 'None');

    // Handle error
    if (error) {
      console.error('❌ OAuth error:', error);
      setStatus('error');
      setMessage(error);

      if (window.opener && !window.opener.closed) {
        console.log('📤 Sending error to parent');
        try {
          window.opener.postMessage(
            { type: 'oauth-error', message: error },
            window.location.origin,
          );
          console.log('✅ Error message sent');
        } catch (err) {
          console.error('❌ Failed to send error:', err);
        }

        setTimeout(() => {
          console.log('🔒 Closing popup (error)');
          window.close();
        }, 2000);
      }
      return;
    }

    // Handle success
    if (token) {
      console.log('✅ Token received');
      setStatus('success');
      setMessage('Authentication successful!');

      if (window.opener && !window.opener.closed) {
        console.log('📤 Sending token to parent window');

        try {
          window.opener.postMessage(
            { type: 'oauth-success', token, provider },
            window.location.origin,
          );
          console.log('✅ Token sent to parent');

          // Wait a bit to ensure message is received before closing
          setTimeout(() => {
            console.log('🔒 Closing popup (success)');
            window.close();
          }, 1000);
        } catch (err) {
          console.error('❌ Failed to send message:', err);
          // Fallback: store token and close
          // localStorage.setItem('token', token);
          authState.setToken(token);
          getUserData();
          setTimeout(() => window.close(), 1000);
        }
      } else {
        console.log('⚠️ No opener window, storing token locally');
        localStorage.setItem('token', token);
        getUserData();
        authState.setToken(token);
        setMessage('Authentication successful! You can close this window.');
      }
    } else {
      console.error('❌ No token or error received');
      setStatus('error');
      setMessage('Authentication failed - no token received');

      setTimeout(() => {
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            { type: 'oauth-error', message: 'No token received' },
            window.location.origin,
          );
        }
        window.close();
      }, 2000);
    }
  }, [searchParams]);

  const getUserData = async () => {
    const res = await getCurrentUserService();
    authState.setUser(res?.data?.data);
    navigate('/', {
      replace: true,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {status === 'processing' && (
          <Box>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6" gutterBottom>
              {message}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait...
            </Typography>
          </Box>
        )}

        {status === 'success' && (
          <Box>
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: 'success.main',
                mb: 2,
              }}
            />
            <Typography variant="h5" gutterBottom color="success.main">
              Success!
            </Typography>
            <Typography variant="body1" gutterBottom>
              {message}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {window.opener ? 'Redirecting...' : 'You can close this window'}
            </Typography>
          </Box>
        )}

        {status === 'error' && (
          <Box>
            <ErrorIcon
              sx={{
                fontSize: 80,
                color: 'error.main',
                mb: 2,
              }}
            />
            <Typography variant="h5" gutterBottom color="error">
              Authentication Failed
            </Typography>
            <Typography variant="body1" gutterBottom>
              {message}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This window will close automatically...
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AuthCallback;
