// components/CVForm/SocialProfilesForm.tsx

import React from 'react';
import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { CVData, SocialProfile } from '@cv-builder/shared-types';
import { AppDynamicFieldArray, TextField } from '@cv-builder/ui-theme';

const SocialProfilesForm: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<CVData>();

  const initialSocialProfile: SocialProfile = {
    id: '',
    platform: '',
    url: '',
  };

  const renderSocialProfileFields = (index: number) => {
    const fieldErrors = errors.socialProfiles?.[index] as any;
    const fieldTouched = touched.socialProfiles?.[index] as any;

    return (
      <>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            required
            name={`socialProfiles.${index}.platform`}
            label="Platform"
            placeholder="e.g., LinkedIn, GitHub"
            value={values.socialProfiles[index]?.platform || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldTouched?.platform && Boolean(fieldErrors?.platform)}
            helperText={fieldTouched?.platform && fieldErrors?.platform}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            required
            name={`socialProfiles.${index}.url`}
            label="Profile URL"
            placeholder="https://..."
            value={values.socialProfiles[index]?.url || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldTouched?.url && Boolean(fieldErrors?.url)}
            helperText={fieldTouched?.url && fieldErrors?.url}
          />
        </Grid>
      </>
    );
  };

  return (
    <AppDynamicFieldArray
      name="socialProfiles"
      title="Social Profile"
      initialValue={initialSocialProfile}
      renderFields={renderSocialProfileFields}
    />
  );
};

export default SocialProfilesForm;
