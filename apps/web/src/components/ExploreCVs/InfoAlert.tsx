import { Alert, AlertTitle, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const InfoAlert = () => {
  return (
    <Alert
      severity="info"
      sx={{
        mt: 4,
        bgcolor: 'secondary.light',
        color: 'common.white',
        '& .MuiAlert-icon': {
          color: 'common.white',
        },
      }}
      icon={<AutoAwesomeIcon />}
    >
      <AlertTitle sx={{ color: 'common.white', fontWeight: 600 }}>
        Pro Tip
      </AlertTitle>
      <Typography variant="body2" sx={{ color: 'common.white' }}>
        All templates are fully customizable with your own content, colors, and
        fonts!
      </Typography>
    </Alert>
  );
};
