// src/components/templates/AppTemplatePreviewCard.tsx

import React from 'react';
import { AppPreviewCard, PreviewCardBadge } from '../../Common';


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
  const badges: PreviewCardBadge[] = [];

  if (isPremium) {
    badges.push({
      label: 'Premium',
      color: 'warning',
      position: 'top-right',
    });
  }

  return (
    <AppPreviewCard
      id={id}
      title={name}
      imagePath={imagePath}
      description={description}
      badges={badges}
      isSelected={isSelected}
      onSelect={onSelect}
      loading={loading}
      hoverText={isSelected ? 'Selected' : 'Select Template'}
      imageHeight="50vh"
    />
  );
};
