// components/CVForm/ExperienceForm.tsx

import React from 'react';
import { Grid, Checkbox, FormControlLabel } from '@mui/material';
import { useFormikContext } from 'formik';
import { CVData, Experience } from '@cv-builder/shared-types';
import { AppDynamicFieldArray, AppTechnologiesInput, TextField } from '@cv-builder/ui-theme';

const ExperienceForm: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<CVData>();

  const initialExperience: Experience = {
    id: '',
    organization: '',
    position: '',
    location: '',
    ctc: '',
    startDate: '',
    endDate: null,
    technologies: [],
  };

  const renderExperienceFields = (index: number) => {
    const fieldErrors = errors.experience?.[index] as any;
    const fieldTouched = touched.experience?.[index] as any;
    const isCurrentJob = values.experience[index]?.endDate === null;

    return (
      <>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name={`experience.${index}.organization`}
            label="Organization"
            value={values.experience[index]?.organization || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              fieldTouched?.organization && Boolean(fieldErrors?.organization)
            }
            helperText={fieldTouched?.organization && fieldErrors?.organization}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name={`experience.${index}.position`}
            label="Position"
            value={values.experience[index]?.position || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldTouched?.position && Boolean(fieldErrors?.position)}
            helperText={fieldTouched?.position && fieldErrors?.position}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name={`experience.${index}.location`}
            label="Location"
            value={values.experience[index]?.location || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldTouched?.location && Boolean(fieldErrors?.location)}
            helperText={fieldTouched?.location && fieldErrors?.location}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name={`experience.${index}.ctc`}
            label="CTC"
            placeholder="e.g., 10 LPA"
            value={values.experience[index]?.ctc || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldTouched?.ctc && Boolean(fieldErrors?.ctc)}
            helperText={fieldTouched?.ctc && fieldErrors?.ctc}
          />
        </Grid>

        <Grid size={{ xs: 12, md: isCurrentJob ? 12 : 6 }}>
          <TextField
            fullWidth
            required
            type="date"
            name={`experience.${index}.startDate`}
            label="Start Date"
            value={values.experience[index]?.startDate || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            InputLabelProps={{ shrink: true }}
            error={fieldTouched?.startDate && Boolean(fieldErrors?.startDate)}
            helperText={fieldTouched?.startDate && fieldErrors?.startDate}
          />
        </Grid>

        {!isCurrentJob && (
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="date"
              name={`experience.${index}.endDate`}
              label="End Date"
              value={values.experience[index]?.endDate || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ shrink: true }}
              error={fieldTouched?.endDate && Boolean(fieldErrors?.endDate)}
              helperText={fieldTouched?.endDate && fieldErrors?.endDate}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCurrentJob}
                onChange={(e) => {
                  setFieldValue(
                    `experience.${index}.endDate`,
                    e.target.checked ? null : '',
                  );
                }}
              />
            }
            label="I currently work here"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <AppTechnologiesInput
            name={`experience.${index}.technologies`}
            label="Technologies"
            value={values.experience[index]?.technologies || []}
            onChange={(techs: any) =>
              setFieldValue(`experience.${index}.technologies`, techs)
            }
            onBlur={handleBlur}
            error={
              fieldTouched?.technologies && Boolean(fieldErrors?.technologies)
            }
            helperText={fieldTouched?.technologies && fieldErrors?.technologies}
          />
        </Grid>
      </>
    );
  };

  return (
    <AppDynamicFieldArray
      name="experience"
      title="Experience"
      initialValue={initialExperience}
      renderFields={renderExperienceFields}
    />
  );
};

export default ExperienceForm;
