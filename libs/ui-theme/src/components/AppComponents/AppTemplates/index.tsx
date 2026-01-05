import { Container, Box, Typography, Divider, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppTemplatePreviewCard } from '../AppTemplatePreviewCard';
import { Button } from '../../Button';

interface Template {
  id: string;
  name: string;
  imagePath: string;
  description: string;
  isPremium: boolean;
}

interface TemplateProps {
  templates: Template[];
}

export const AppTemplates = ({ templates }: TemplateProps) => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (id: string) => {
    if (selectedTemplate === id) {
      setSelectedTemplate(null);
      return;
    }
    setSelectedTemplate(id);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate(`/cv/create?template=${selectedTemplate}`);
    }
  };
  return (
    <Box>
      <Grid container spacing={4}>
        {templates.map((template) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template.id}>
            <AppTemplatePreviewCard
              id={template.id}
              name={template.name}
              imagePath={template.imagePath}
              description={template.description}
              isPremium={template.isPremium}
              isSelected={selectedTemplate === template.id}
              onSelect={handleTemplateSelect}
            />
          </Grid>
        ))}
      </Grid>

      {selectedTemplate && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center',
            boxShadow: 3,
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            sx={{
              minWidth: 250,
              bgcolor: 'primary.main',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Continue with{' '}
            {templates.find((t) => t.id === selectedTemplate)?.name}
          </Button>
        </Box>
      )}
    </Box>
  );
};
