import theme from "@cv-builder/ui-theme";
import { Paper, Box, Typography, Chip } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const NotificationBanner = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        mb: 4,
        p: 3,
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <RocketLaunchIcon sx={{ fontSize: 48, color: 'common.white' }} />
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: 'common.white', mb: 0.5 }}
            >
              Stay Tuned, New Templates Dropping Soon !!!
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'common.white', opacity: 0.95 }}
            >
              We're working on exciting new designs to help you stand out
            </Typography>
          </Box>
        </Box>
        <Chip
          icon={<AutoAwesomeIcon />}
          label="Coming Soon"
          sx={{
            bgcolor: 'primary.main',
            color: 'text.primary',
            fontWeight: 600,
            height: 36,
            '&:hover': {
              bgcolor: 'primary.light',
            },
          }}
        />
      </Box>

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.1)',
        }}
      />
    </Paper>
  );
}
