// components/templates/AppTemplatePreviewCard.tsx

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Skeleton,
  alpha,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TemplatePreviewCardProps {
  id: string;
  name: string;
  imagePath: string;
  description?: string;
  isPremium?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  loading?: boolean;
}

export const AppTemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({
  id,
  name,
  imagePath,
  description,
  isPremium = false,
  isSelected = false,
  onSelect,
  loading = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleCardClick = () => {
    onSelect?.(id);
  };

  if (loading) {
    return (
      <Card sx={{ height: '100%' }}>
        <Skeleton variant="rectangular" height={300} />
        <CardContent>
          <Skeleton variant="text" width="60%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        cursor: onSelect ? 'pointer' : 'default',
        position: 'relative',
        transition: 'all 0.3s ease',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'divider',
        '&:hover': onSelect
          ? {
              boxShadow: 6,
              transform: 'translateY(-4px)',
              borderColor: 'primary.main',
            }
          : {},
      }}
    >
      {/* Premium Badge */}
      {isPremium && (
        <Chip
          label="Premium"
          color="warning"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 2,
            fontWeight: 600,
          }}
        />
      )}

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

      {/* Template Image */}
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
            alt={name}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            sx={{
              width: '100%',
              height: '50vh',
              display: imageLoading ? 'none' : 'block',
              objectFit: 'fill',
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: 300,
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
        {onSelect && (
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
              {isSelected ? 'Selected' : 'Select Template'}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Template Info */}
      <CardContent sx={{ pt: 2, pb: 2, }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            mb: description ? 0.5 : 0,
          }}
        >
          {name}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

