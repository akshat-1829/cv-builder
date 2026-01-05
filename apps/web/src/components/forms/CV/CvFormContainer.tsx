// components/CVForm/CVFormContainer.tsx

import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Paper, Container } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { CVData } from '@cv-builder/shared-types';
import CVFormContent from './CvFormContent';
import { cvFormValidationSchema } from '@cv-builder/shared-utils';

interface CVFormContainerProps {
  initialData?: CVData;
  onSubmit: (data: CVData) => Promise<void>;
}

const CVFormContainer: React.FC<CVFormContainerProps> = ({
  initialData,
  onSubmit,
}) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const initialValues: CVData = initialData || {
    title: '',
    basicDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      summary: '',
      image: '',
    },
    education: [
      {
        id: uuidv4(),
        degree: '',
        institution: '',
        percentage: 0,
        startDate: '',
        endDate: '',
      },
    ],
    experience: [],
    projects: [],
    skills: [],
    socialProfiles: [],
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSubmit = async (values: CVData) => {
    try {
      await onSubmit(values);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={cvFormValidationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize
        >
          <CVFormContent onDirtyChange={setHasUnsavedChanges} />
        </Formik>
      </Paper>
    </Container>
  );
};

export default CVFormContainer;
