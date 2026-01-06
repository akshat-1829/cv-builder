// components/CVForm/CVFormContent.tsx

import React, { useState, useEffect } from 'react';
import { Form, useFormikContext } from 'formik';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import BasicDetailsForm from './CategoryWiseForms/BasicDetailsForm';
import EducationForm from './CategoryWiseForms/EducationForm';
import ExperienceForm from './CategoryWiseForms/ExperienceForm';
import ProjectsForm from './CategoryWiseForms/ProjectsForm';
import SkillsForm from './CategoryWiseForms/SkillsForm';
import { CVData } from '@cv-builder/shared-types';
import SocialProfilesForm from './CategoryWiseForms/SocialProfileForm';
import { Button, TextField } from '@cv-builder/ui-theme';

const steps = [
  'Basic Details',
  'Education',
  'Experience',
  'Projects',
  'Skills',
  'Social Profiles',
];

interface CVFormContentProps {
  onDirtyChange: (isDirty: boolean) => void;
}

const CVFormContent: React.FC<CVFormContentProps> = ({ onDirtyChange }) => {
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

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNextClick = async () => {
    // const validationErrors = await validateForm();
    // const currentStepErrors = getCurrentStepErrors(
    //   activeStep,
    //   validationErrors,
    // );

    // if (Object.keys(currentStepErrors).length === 0) {
      handleNext();
    // }
  };

  const getStepContent = (step: number) => {
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
  };

  const getCurrentStepErrors = (step: number, errors: any) => {
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
  };

  return (
    <Form>
      <Box sx={{ mb: 4 }}>
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

      <Stepper activeStep={activeStep} sx={{ mb: 4 }} >
        {steps.map((label) => (
          <Step key={label} onClick={() => setActiveStep(steps.indexOf(label))} sx={{ cursor: 'pointer' }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ minHeight: '400px', mb: 4 }}>{getStepContent(activeStep)}</Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {activeStep === steps.length - 1 ? (
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNextClick}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Form>
  );
};

export default CVFormContent;
