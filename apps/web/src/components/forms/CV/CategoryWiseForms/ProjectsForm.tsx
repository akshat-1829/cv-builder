// components/CVForm/ProjectsForm.tsx

import React from 'react';
import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { CVData, Project } from '@cv-builder/shared-types';
import { AppDynamicFieldArray, AppTechnologiesInput, TextField } from '@cv-builder/ui-theme';

const ProjectsForm: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<CVData>();

  const initialProject: Project = {
    id: '',
    title: '',
    teamSize: 1,
    duration: '',
    technologies: [],
    description: '',
  };

  const renderProjectFields = (index: number) => {
    const fieldErrors = errors.projects?.[index] as any;
    const fieldTouched = touched.projects?.[index] as any;

    return (
      <>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            required
            name={`projects.${index}.title`}
            label="Project Title"
            value={values.projects[index]?.title || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldTouched?.title && Boolean(fieldErrors?.title)}
            helperText={fieldTouched?.title && fieldErrors?.title}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="number"
            name={`projects.${index}.teamSize`}
            label="Team Size"
            value={values.projects[index]?.teamSize || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{ min: 1 }}
            error={fieldTouched?.teamSize && Boolean(fieldErrors?.teamSize)}
            helperText={fieldTouched?.teamSize && fieldErrors?.teamSize}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name={`projects.${index}.duration`}
            label="Duration"
            placeholder="e.g., 6 months, 1 year"
            value={values.projects[index]?.duration || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldTouched?.duration && Boolean(fieldErrors?.duration)}
            helperText={fieldTouched?.duration && fieldErrors?.duration}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <AppTechnologiesInput
            name={`projects.${index}.technologies`}
            label="Technologies"
            value={values.projects[index]?.technologies || []}
            onChange={(techs) =>
              setFieldValue(`projects.${index}.technologies`, techs)
            }
            onBlur={handleBlur}
            error={
              fieldTouched?.technologies && Boolean(fieldErrors?.technologies)
            }
            helperText={fieldTouched?.technologies && fieldErrors?.technologies}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            name={`projects.${index}.description`}
            label="Description"
            value={values.projects[index]?.description || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              fieldTouched?.description && Boolean(fieldErrors?.description)
            }
            helperText={fieldTouched?.description && fieldErrors?.description}
          />
        </Grid>
      </>
    );
  };

  return (
    <AppDynamicFieldArray
      name="projects"
      title="Project"
      initialValue={initialProject}
      renderFields={renderProjectFields}
    />
  );
};

export default ProjectsForm;
