// src/components/common/PreviewCard.tsx

import React, { useState, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Skeleton,
  alpha,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface PreviewCardAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success';
}

export interface PreviewCardBadge {
  label: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface PreviewCardProps {
  id: string;
  title: string;
  imagePath: string;
  subtitle?: string;
  description?: string;
  badges?: PreviewCardBadge[];
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onClick?: (id: string) => void;
  loading?: boolean;
  actions?: PreviewCardAction[];
  quickActions?: ReactNode;
  hoverText?: string;
  imageHeight?: string | number;
  showMenu?: boolean;
}

export const AppPreviewCard: React.FC<PreviewCardProps> = ({
  id,
  title,
  imagePath,
  subtitle,
  description,
  badges = [],
  isSelected = false,
  onSelect,
  onClick,
  loading = false,
  actions = [],
  quickActions,
  hoverText,
  imageHeight = 300,
  showMenu = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent triggering when clicking on action buttons
    if ((e.target as HTMLElement).closest('.action-button, .menu-button')) {
      return;
    }

    if (onClick) {
      onClick(id);
    } else if (onSelect) {
      onSelect(id);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: PreviewCardAction) => {
    action.onClick();
    handleMenuClose();
  };

  const getBadgePosition = (position: string) => {
    switch (position) {
      case 'top-left':
        return { top: 12, left: 12 };
      case 'top-right':
        return { top: 12, right: 12 };
      case 'bottom-left':
        return { bottom: 12, left: 12 };
      case 'bottom-right':
        return { bottom: 12, right: 12 };
      default:
        return { top: 12, right: 12 };
    }
  };

  if (loading) {
    return (
      <Card sx={{ height: '100%' }}>
        <Skeleton variant="rectangular" height={imageHeight} />
        <CardContent>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        onClick={handleCardClick}
        sx={{
          height: '100%',
          cursor: onSelect || onClick ? 'pointer' : 'default',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          border: isSelected ? 2 : 1,
          borderColor: isSelected ? 'primary.main' : 'divider',
          '&:hover':
            onSelect || onClick
              ? {
                  boxShadow: 6,
                  transform: 'translateY(-8px)',
                  borderColor: 'primary.main',
                }
              : {},
        }}
      >
        {/* Badges */}
        {badges.map((badge, index) => (
          <Chip
            key={index}
            label={badge.label}
            color={badge.color || 'default'}
            size="small"
            sx={{
              position: 'absolute',
              ...getBadgePosition(badge.position || 'top-right'),
              zIndex: 2,
              fontWeight: 600,
            }}
          />
        ))}

        {/* Selected Indicator */}
        {isSelected && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              zIndex: 2,
              bgcolor: 'primary.main',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 2,
            }}
          >
            <CheckCircleIcon sx={{ color: 'white', fontSize: 32 }} />
          </Box>
        )}

        {/* Menu Button */}
        {showMenu && actions.length > 0 && (
          <IconButton
            className="menu-button"
            onClick={handleMenuOpen}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 3,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                bgcolor: 'white',
              },
            }}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        )}

        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            bgcolor: 'grey.100',
            overflow: 'hidden',
          }}
        >
          {imageLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          )}

          {!imageError ? (
            <CardMedia
              component="img"
              image={imagePath}
              alt={title}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              sx={{
                width: '100%',
                height: imageHeight,
                display: imageLoading ? 'none' : 'block',
                objectFit: 'fill',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: imageHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.200',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Image not available
              </Typography>
            </Box>
          )}

          {/* Hover Overlay */}
          {(onSelect || onClick) && hoverText && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: alpha('#000', 0.4),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textAlign: 'center',
                  px: 2,
                }}
              >
                {hoverText}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Content */}
        <CardContent sx={{ pt: 2, pb: 1, flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              mb: subtitle || description ? 0.5 : 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 0.5 }}
            >
              {subtitle}
            </Typography>
          )}

          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>

        {/* Quick Actions */}
        {quickActions && (
          <Box className="action-button" sx={{ px: 1, pb: 1 }}>
            {quickActions}
          </Box>
        )}
      </Card>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((action, index) => (
          <MenuItem key={index} onClick={() => handleActionClick(action)}>
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
