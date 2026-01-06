// components/dashboard/DashboardHero.tsx (using HeroSection)
import { Typography, Stack, useTheme } from '@mui/material';
import { AppHero } from '../../Common';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImageUrl?: string;
}

export const AppHeroSection = ({ title, subtitle, backgroundImageUrl }: HeroSectionProps) => {
  const theme = useTheme();

  return (
    <AppHero
      sx={{
        // Background for dashboard (override default gradient)
        backgroundImage: `linear-gradient(rgba(0,0,0, 0.75)), url("${backgroundImageUrl || 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN2fGVufDB8fDB8fHww'}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 8 },
        maxWidth: '100%',
      }}
      justifyContent="center"
    >
      <Stack
        spacing={4}
        alignSelf="center"
        textAlign="center"
        alignItems="center"
      >
        {/* Main heading */}
        <Typography
          variant="h1"
          fontWeight={800}
          sx={{
            fontSize: { xs: '3rem', md: '4.5rem' },
            lineHeight: 1.1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          {title || 'Welcome to Your Page'}
        </Typography>
        <Typography
          variant="h5"
          color="common.white"
          sx={{
            opacity: 0.95,
            fontWeight: 400,
            maxWidth: 600,
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          {subtitle ||
            'Manage your CVs, explore new layouts, and get download-ready resumes instantly.'}
        </Typography>
      </Stack>
    </AppHero>
  );
};
