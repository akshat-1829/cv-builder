// components/CVForm/SkillsForm.tsx

import React from 'react';
import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { AppDynamicFieldArray, TextField } from '@cv-builder/ui-theme';
import { CVData, Skill } from '@cv-builder/shared-types';

const SkillsForm: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<CVData>();

  const initialSkill: Skill = {
    id: '',
    name: '',
    percentage: 0,
  };

  const renderSkillFields = (index: number) => {
    const fieldErrors = errors.skills?.[index] as any;
    const fieldTouched = touched.skills?.[index] as any;

    return (
      <>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name={`skills.${index}.name`}
            label="Skill Name"
            value={values.skills[index]?.name || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldTouched?.name && Boolean(fieldErrors?.name)}
            helperText={fieldTouched?.name && fieldErrors?.name}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="number"
            name={`skills.${index}.percentage`}
            label="Proficiency (%)"
            value={values.skills[index]?.percentage || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{ min: 0, max: 100 }}
            error={fieldTouched?.percentage && Boolean(fieldErrors?.percentage)}
            helperText={fieldTouched?.percentage && fieldErrors?.percentage}
          />
        </Grid>
      </>
    );
  };

  return (
    <AppDynamicFieldArray
      name="skills"
      title="Skill"
      initialValue={initialSkill}
      renderFields={renderSkillFields}
    />
  );
};

export default SkillsForm;
