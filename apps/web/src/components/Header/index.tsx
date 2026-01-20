// components/layout/MainHeader.tsx (FIXED)
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Divider,
  useMediaQuery,
  Theme,
  useTheme,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useScrollTrigger } from '@mui/material';
import { AppBarHeader, HeaderToolbar } from '@cv-builder/ui-theme';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authSore';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Explore CVs', path: '/explore-cvs' },
];

const AppHeader = () => {
  const authState = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  };

  const whiteColor = theme.palette.common.white;
  const transparentText = alpha(whiteColor, 0.9);
  // const transparentSecondary = alpha(whiteColor, 0.8);

  const logout = () => {
    authState.logout();
    navigate('/login');
  };

  return (
    <AppBarHeader position="static" isScrolled={isScrolled}>
      <HeaderToolbar>
        {/* 1. Logo - Fixed colors */}
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          sx={{ maxWidth: '100vw' }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: theme.shape.borderRadius,
              background: isScrolled
                ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.secondary.main, 0.3)})`,
              transition: 'all 0.3s ease',
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isScrolled ? 'text.primary' : whiteColor,
                transition: 'color 0.3s ease',
              }}
            >
              CV Builder
            </Typography>
            <Typography
              variant="caption"
              sx={{
                letterSpacing: 0.2,
                color: isScrolled ? 'text.secondary' : transparentText,
                transition: 'color 0.3s ease',
              }}
            >
              Craft standout resumes
            </Typography>
          </Box>
        </Box>

        {/* 2. Menu items */}
        {!isMobile && (
          <Box display="flex" alignItems="center" gap={1.5}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Box
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    textDecoration: 'none',
                    textTransform: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isScrolled ? 'text.primary' : whiteColor,
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    backgroundColor: isActive
                      ? isScrolled
                        ? theme.palette.primary.main
                        : alpha(theme.palette.primary.main, 0.2)
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive
                        ? isScrolled
                          ? theme.palette.primary.main
                          : alpha(theme.palette.primary.main, 0.2)
                        : isScrolled
                        ? theme.palette.action.hover
                        : alpha(whiteColor, 0.2),
                    },
                  }}
                >
                  {item.label}
                </Box>
              );
            })}
          </Box>
        )}

        {/* 3. User menu */}
        <Box display="flex" alignItems="center" gap={1.5}>
          {isMobile && (
            <>
              <IconButton
                sx={{ color: isScrolled ? 'text.primary' : whiteColor }}
                edge="start"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorNav}
                open={Boolean(anchorNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <MenuItem key={item.path}>
                      <Box
                        component={Link}
                        to={item.path}
                        sx={{
                          bgcolor: 'common.white',
                          color: 'text.primary',
                          borderRadius: 2,
                          textDecoration: 'none',
                          display: 'inline-block',
                          fontWeight: isActive ? 600 : 400,
                          backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                          '&:hover': {
                            bgcolor: 'background.default',
                          },
                        }}
                      >
                        {item.label}
                      </Box>
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          )}

          <Box
            onClick={handleOpenUserMenu}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.75,
              borderRadius: 999,
              cursor: 'pointer',
              border: isScrolled
                ? `1px solid ${theme.palette.grey[200]}`
                : `1px solid ${alpha(whiteColor, 0.2)}`,
              backgroundColor: isScrolled
                ? theme.palette.common.white
                : alpha(whiteColor, 0.15),
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)',
                backgroundColor: isScrolled
                  ? theme.palette.common.white
                  : alpha(whiteColor, 0.25),
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: 14,
                backgroundColor: isScrolled
                  ? theme.palette.secondary.main
                  : alpha(theme.palette.secondary.main, 0.4),
                color: theme.palette.common.white,
                transition: 'all 0.3s ease',
              }}
            >
              JD
            </Avatar>
            {!isMobile && (
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{
                    color: isScrolled ? 'text.primary' : whiteColor,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {authState?.user?.username || 'John Doe'}
                </Typography>
                {/* <Typography
                  variant="caption"
                  sx={{
                    color: isScrolled ? 'text.secondary' : transparentSecondary,
                    transition: 'color 0.3s ease',
                  }}
                >
                  Free plan
                </Typography> */}
              </Box>
            )}
            <KeyboardArrowDownIcon
              fontSize="small"
              sx={{
                color: isScrolled ? 'text.primary' : whiteColor,
                transition: 'color 0.3s ease',
              }}
            />
          </Box>

          <Menu
            anchorEl={anchorUser}
            open={Boolean(anchorUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ width: '100%' }}
          >
            {/* <MenuItem>Profile</MenuItem> */}
            {/* <MenuItem>Billing</MenuItem> */}
            {/* <Divider /> */}
            <MenuItem onClick={logout}>
              <Typography
                variant="body2"
                textAlign="center"
                sx={{ width: '100%' }}
              >
                Logout
              </Typography>
              {/* <Box
                component={Link}
                to="/login"
                sx={{
                  bgcolor: 'common.white',
                  color: 'text.primary',
                  borderRadius: 2,
                  // fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block',
                  '&:hover': {
                    bgcolor: 'background.default',
                  },
                }}
              >
                Logout
              </Typography> */}
            </MenuItem>
          </Menu>
        </Box>
      </HeaderToolbar>
    </AppBarHeader>
  );
};

export default AppHeader;
