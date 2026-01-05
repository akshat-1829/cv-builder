import { Grid, Paper, Box, Typography } from "@mui/material";

const LoginImageSection = () => {

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper
        sx={{
          height: '100vh',
          borderRadius: 0,
          overflow: 'hidden',
          position: 'relative',
          background: `linear-gradient(135deg, #000000 50%, #ffffff 100%)`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'url("https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3Z8ZW58MHx8MHx8fDA%3D")', // Replace with hero image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
          }}
        />
        <Box
          sx={{
            position: 'relative',
            p: { xs: 4, md: 6 },
            textAlign: { xs: 'center', md: 'left' },
            color: 'common.white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            mb={2}
            sx={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          >
            Welcome to CV Builder
          </Typography>
          <Typography
            variant="h6"
            sx={{
              // opacity: 0.95,
              lineHeight: 1.5,
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            Create professional CVs in minutes with stunning layouts and
            real-time previews.
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default LoginImageSection;
