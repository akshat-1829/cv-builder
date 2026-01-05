// components/layout/MainFooter.tsx
import {
  Box,
  Typography,
  Grid,
  IconButton,
  TextField,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
} from '@mui/icons-material';
import { FooterContainer, FooterLink, FooterSection } from '@cv-builder/ui-theme';


const socialIcons = [
  { icon: Facebook, label: 'Facebook', url: 'https://facebook.com/cvbuilder' },
  { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/cvbuilder' },
  {
    icon: LinkedIn,
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/cvbuilder',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    url: 'https://instagram.com/cvbuilder',
  },
  { icon: YouTube, label: 'YouTube', url: 'https://youtube.com/cvbuilder' },
];

const navGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Layouts', path: '/layouts' },
      { label: 'Editor', path: '/editor' },
      { label: 'Templates', path: '/templates' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Careers', path: '/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', path: '/help' },
      { label: 'Contact', path: '/contact' },
      { label: 'Privacy', path: '/privacy' },
    ],
  },
];

const AppFooter = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubscribe = (email: string) => {
    console.log('Subscribe:', email);
    // Integrate with your newsletter service (e.g., Mailchimp)
  };

  return (
    <FooterContainer maxWidth={false}>
      <Grid container spacing={6}>
        {/* Company info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FooterSection>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: theme.shape.borderRadius,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" fontWeight={700} color="common.white">
                CVB
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="grey.300"
              mb={3}
              lineHeight={1.6}
            >
              Build standout CVs with professional layouts, real-time previews,
              and seamless sharing.
            </Typography>
            <Box display="flex" gap={1}>
              {socialIcons.map(({ icon: Icon, label, url }) => (
                <IconButton
                  key={label}
                  href={url}
                  target="_blank"
                  sx={{
                    color: 'common.white',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      color: theme.palette.primary.main,
                    },
                  }}
                  size="small"
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </FooterSection>
        </Grid>

        {/* Navigation groups */}
        {navGroups.map(({ title, links }) => (
          <Grid key={title} size={{ xs: 12, sm: 6, md: 2.5 }}>
            <FooterSection>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mb={3}
                color="common.white"
              >
                {title}
              </Typography>
              {links.map(({ label, path }) => (
                <FooterLink key={label} href={path}>
                  {label}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>
        ))}

        {/* Newsletter */}
        <Grid size={{ xs: 12, md: 3 }}>
          <FooterSection>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={3}
              color="common.white"
            >
              Stay Updated
            </Typography>
            <Typography
              variant="body2"
              color="grey.300"
              mb={3}
              lineHeight={1.6}
            >
              Get tips, templates, and CV trends delivered to your inbox.
            </Typography>
            <Box component="form" onSubmit={(e) => e.preventDefault()}>
              <TextField
                fullWidth
                placeholder="your@email.com"
                size="small"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'common.white',
                    borderRadius: theme.shape.borderRadius,
                  },
                  '& .MuiInputLabel-root': { color: 'grey.700' },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={() => handleSubscribe('user@email.com')} // Replace with form state
                sx={{
                  py: 1.2,
                  borderRadius: theme.shape.borderRadius,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Subscribe
              </Button>
            </Box>
          </FooterSection>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

      {/* Bottom bar */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body2" color="grey.400">
          © 2026 CV Builder. All rights reserved.
        </Typography>
        <Box display="flex" gap={2}>
          <FooterLink href="/terms">Terms</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/cookies">Cookies</FooterLink>
        </Box>
      </Box>
    </FooterContainer>
  );
};

export default AppFooter;
