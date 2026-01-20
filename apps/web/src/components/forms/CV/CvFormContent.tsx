// components/CVForm/CVFormContent.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Form, useFormikContext } from 'formik';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import BasicDetailsForm from './CategoryWiseForms/BasicDetailsForm';
import EducationForm from './CategoryWiseForms/EducationForm';
import ExperienceForm from './CategoryWiseForms/ExperienceForm';
import ProjectsForm from './CategoryWiseForms/ProjectsForm';
import SkillsForm from './CategoryWiseForms/SkillsForm';
import { CVData } from '@cv-builder/shared-types';
import SocialProfilesForm from './CategoryWiseForms/SocialProfileForm';
import { Button, TextField } from '@cv-builder/ui-theme';

// Memoized step labels to prevent recalculation
const STEPS = [
  'Basic Details',
  'Education',
  'Experience',
  'Projects',
  'Skills',
  'Social Profiles',
] as const;

interface CVFormContentProps {
  onDirtyChange: (isDirty: boolean) => void;
  onStepChange?: () => void;
}

const CVFormContent: React.FC<CVFormContentProps> = ({ onDirtyChange, onStepChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);

  const {
    isSubmitting,
    dirty,
    validateForm,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = useFormikContext<CVData>();

  useEffect(() => {
    onDirtyChange(dirty);
  }, [dirty, onDirtyChange]);

  const handleNext = useCallback(() => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, STEPS.length - 1));
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  }, []);

  const handleStepClick = useCallback((stepIndex: number) => {
    setActiveStep(stepIndex);
    onStepChange?.();
  }, [onStepChange]);

  const getStepContent = useCallback((step: number) => {
    switch (step) {
      case 0:
        return <BasicDetailsForm />;
      case 1:
        return <EducationForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <ProjectsForm />;
      case 4:
        return <SkillsForm />;
      case 5:
        return <SocialProfilesForm />;
      default:
        return null;
    }
  }, []);

  // Memoized derived data
  const isLastStep = useMemo(() => activeStep === STEPS.length - 1, [activeStep]);
  const isFirstStep = useMemo(() => activeStep === 0, [activeStep]);
  const stepContent = useMemo(() => getStepContent(activeStep), [activeStep, getStepContent]);

  const getCurrentStepErrors = useCallback((step: number, errors: any) => {
    const stepFields = [
      'basicDetails',
      'education',
      'experience',
      'projects',
      'skills',
      'socialProfiles',
    ];

    const currentField = stepFields[step];
    return errors[currentField] ? { [currentField]: errors[currentField] } : {};
  }, []);

  return (
    <Form id="cv-form">
      <Box sx={{ mb: isMobile ? 3 : 5 }}>
        <TextField
          fullWidth
          required
          name="title"
          label="CV Title"
          placeholder="e.g., Software Engineer Resume 2026"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
        />
      </Box>

      <Box
        sx={{
          mb: isMobile ? 3 : 5,
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: '12px', sm: '16px', md: '24px' },
          alignItems: 'center',
          padding: isMobile ? '16px' : '20px',
          backgroundColor: '#fafafa',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
        }}
      >
        {STEPS.map((label, index) => (
          <Box
            key={label}
            onClick={() => handleStepClick(index)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              flex: `0 1 auto`,
              minWidth: 0,
              transition: 'all 0.3s ease',
              padding: '8px 4px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '& .step-circle': {
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  transform: 'scale(1.05)',
                },
                '& .step-label': {
                  fontWeight: 600,
                  color: 'primary.main',
                },
              },
            }}
          >
            {/* Step Circle */}
            <Box
              className="step-circle"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '28px' : '36px',
                height: isMobile ? '28px' : '36px',
                borderRadius: '50%',
                backgroundColor: activeStep >= index ? 'primary.main' : '#e0e0e0',
                color: activeStep >= index ? 'white' : '#999',
                fontSize: isMobile ? '0.75rem' : '0.9rem',
                fontWeight: activeStep >= index ? 700 : 500,
                flexShrink: 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: activeStep >= index ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
              }}
            >
              {activeStep > index ? '✓' : index + 1}
            </Box>

            {/* Step Label */}
            <Box
              className="step-label"
              sx={{
                ml: isMobile ? '8px' : '12px',
                mr: 0,
                fontSize: isMobile ? '0.7rem' : isTablet ? '0.85rem' : '0.95rem',
                color: activeStep >= index ? 'primary.main' : '#666',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                maxWidth: isMobile ? '55px' : isTablet ? '75px' : '90px',
                lineHeight: 1.3,
                transition: 'all 0.3s ease',
                flexShrink: 0,
                fontWeight: activeStep === index ? 600 : 400,
              }}
            >
              {label}
            </Box>

            {/* Connector (hidden after last step or on new row) */}
            {index < STEPS.length - 1 && (
              <Box
                sx={{
                  width: isMobile ? '10px' : '16px',
                  height: '2px',
                  backgroundColor: activeStep > index ? 'primary.main' : '#d0d0d0',
                  flexShrink: 0,
                  transition: 'background-color 0.3s ease',
                  ml: isMobile ? '4px' : '8px',
                  mr: isMobile ? '4px' : '8px',
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ minHeight: isMobile ? '300px' : '400px', mb: isMobile ? 3 : 5 }}>{stepContent}</Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: isMobile ? 2 : 3,
          flexWrap: 'wrap',
          paddingTop: isMobile ? '16px' : '20px',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Button
          disabled={isFirstStep}
          onClick={handleBack}
          variant="outlined"
          sx={{
            minWidth: isMobile ? '80px' : '100px',
            padding: isMobile ? '8px 16px' : '10px 24px',
          }}
        >
          Back
        </Button>

        <Box sx={{ display: 'flex', gap: isMobile ? 2 : 3 }}>
          {isLastStep ? (
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                minWidth: isMobile ? '100px' : '120px',
                padding: isMobile ? '8px 16px' : '10px 24px',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                minWidth: isMobile ? '80px' : '100px',
                padding: isMobile ? '8px 16px' : '10px 24px',
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Form>
  );
};

export default React.memo(CVFormContent);
