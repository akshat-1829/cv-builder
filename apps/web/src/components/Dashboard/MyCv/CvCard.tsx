// src/components/Dashboard/CVCard.tsx

import React from 'react';
import { IconButton, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistanceToNow } from 'date-fns';
import {
  AppPreviewCard,
  PreviewCardAction,
  PreviewCardBadge,
} from '@cv-builder/ui-theme';

interface CVCardProps {
  cv: {
    id: string;
    title: string;
    templateId: string;
    previewUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  onEdit: () => void;
  onShare: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

const CVCard: React.FC<CVCardProps> = ({
  cv,
  onEdit,
  onShare,
  onDownload,
  onDelete,
}) => {
  const badges: PreviewCardBadge[] = [
    {
      label: `Updated ${formatDistanceToNow(new Date(cv.updatedAt), { addSuffix: true })}`,
      color: 'default',
      position: 'top-left',
    },
  ];

  const actions: PreviewCardAction[] = [
    {
      label: 'Edit',
      icon: <EditIcon fontSize="small" />,
      onClick: onEdit,
      color: 'primary',
    },
    {
      label: 'Share',
      icon: <ShareIcon fontSize="small" />,
      onClick: onShare,
      color: 'primary',
    },
    {
      label: 'Download',
      icon: <DownloadIcon fontSize="small" />,
      onClick: onDownload,
      color: 'primary',
    },
    {
      label: 'Delete',
      icon: <DeleteIcon fontSize="small" />,
      onClick: onDelete,
      color: 'error',
    },
  ];

  const quickActions = (
    <CardActions sx={{ justifyContent: 'space-around', pt: 0 }}>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        color="primary"
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onShare();
        }}
        color="primary"
      >
        <ShareIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        color="primary"
      >
        <DownloadIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        color="error"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </CardActions>
  );

  return (
    <AppPreviewCard
      id={cv.id}
      title={cv.title || 'Untitled CV'}
      imagePath={cv.previewUrl || '/placeholder-cv.png'}
      subtitle={`Template: ${cv.templateId.replace('_', ' ').toUpperCase()}`}
      badges={badges}
      onClick={onEdit}
      actions={actions}
      quickActions={quickActions}
      showMenu={true}
      imageHeight={280}
      hoverText="Click to Edit"
    />
  );
};

export default CVCard;
