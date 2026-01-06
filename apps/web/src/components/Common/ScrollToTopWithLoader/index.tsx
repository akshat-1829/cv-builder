// src/components/common/ScrollToTopWithLoader.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';

export const ScrollToTopWithLoader: React.FC = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <Box sx={{ position: 'fixed', top: '4rem', left: 0, right: 0, zIndex: 9999 }}>
      <LinearProgress />
    </Box>
  );
};

