import { AppTemplates } from '@cv-builder/ui-theme';
import { Container, Box, Typography, Divider } from '@mui/material';
import { NotificationBanner } from './NotificationBanner';
import { InfoAlert } from './InfoAlert';

interface Template {
  id: string;
  name: string;
  imagePath: string;
  description: string;
  isPremium: boolean;
}

const templates: Template[] = [
  {
    id: 'temp_1',
    name: 'Template 1',
    imagePath: '/assets/template_1.png',
    description: 'Professional design with modern layout and clean structure',
    isPremium: false,
  },
  {
    id: 'temp_2',
    name: 'Template 2',
    imagePath: '/assets/template_2.png',
    description: 'Elegant and minimal style perfect for any industry',
    isPremium: false,
  },
  {
    id: 'temp_3',
    name: 'Template 3',
    imagePath: '/assets/template_3.png',
    description: 'Creative design with vibrant colors and modern aesthetics',
    isPremium: false,
  },
];

const ExploreCvContainer: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: 'text.primary',
            mb: 2,
            mt: 12,
          }}
        >
          Explore CV Templates
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Choose from our professionally designed templates to create your
          perfect CV
        </Typography>
      </Box>

      {/* Banner Section - Using Theme Colors */}
      <NotificationBanner />
      {/* Available Templates Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          color="text.primary"
        >
          Available Templates
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Click on a template to select it and start building your CV
        </Typography>
        <Divider sx={{ borderColor: 'text.secondary', opacity: 0.2 }} />
      </Box>

      {/* Templates Grid */}

      <AppTemplates templates={templates} />
      {/* Info Alert */}
      <InfoAlert />
      {/* Continue Button */}
    </Container>
  );
};

export default ExploreCvContainer;
