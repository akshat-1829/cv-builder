// components/CVForm/EducationForm.tsx

import React from 'react';
import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { CVData, Education } from '@cv-builder/shared-types';
import { AppDynamicFieldArray, TextField } from '@cv-builder/ui-theme';


const EducationForm: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<CVData>();

  const initialEducation: Education = {
    id: '',
    degree: '',
    institution: '',
    percentage: 0,
    startDate: '',
    endDate: '',
  };

  const renderEducationFields = (index: number) => {
    const fieldErrors = errors.education?.[index] as any;
    const fieldTouched = touched.education?.[index] as any;

    return (
      <>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name={`education.${index}.degree`}
            label="Degree"
            placeholder="e.g., B.Tech Computer Science"
            value={values.education[index]?.degree || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldTouched?.degree && Boolean(fieldErrors?.degree)}
            helperText={fieldTouched?.degree && fieldErrors?.degree}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name={`education.${index}.institution`}
            label="Institution"
            value={values.education[index]?.institution || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              fieldTouched?.institution && Boolean(fieldErrors?.institution)
            }
            helperText={fieldTouched?.institution && fieldErrors?.institution}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            required
            type="number"
            name={`education.${index}.percentage`}
            label="Percentage / CGPA"
            value={values.education[index]?.percentage || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{ min: 0, max: 100, step: 0.01 }}
            error={fieldTouched?.percentage && Boolean(fieldErrors?.percentage)}
            helperText={fieldTouched?.percentage && fieldErrors?.percentage}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            required
            type="date"
            name={`education.${index}.startDate`}
            label="Start Date"
            value={values.education[index]?.startDate || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            InputLabelProps={{ shrink: true }}
            error={fieldTouched?.startDate && Boolean(fieldErrors?.startDate)}
            helperText={fieldTouched?.startDate && fieldErrors?.startDate}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            required
            type="date"
            name={`education.${index}.endDate`}
            label="End Date"
            value={values.education[index]?.endDate || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            InputLabelProps={{ shrink: true }}
            error={fieldTouched?.endDate && Boolean(fieldErrors?.endDate)}
            helperText={fieldTouched?.endDate && fieldErrors?.endDate}
          />
        </Grid>
      </>
    );
  };

  return (
    <AppDynamicFieldArray
      name="education"
      title="Education"
      initialValue={initialEducation}
      renderFields={renderEducationFields}
    />
  );
};

export default EducationForm;
