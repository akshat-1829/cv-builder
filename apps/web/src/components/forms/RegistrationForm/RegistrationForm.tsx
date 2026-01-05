// apps/cv-builder/src/components/forms/RegistrationForm/RegistrationForm.tsx
import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { useFormik, FormikProvider } from 'formik';
import { Button, TextField } from '@cv-builder/ui-theme';
import { RegistrationFormValues } from '@cv-builder/shared-types';
import { registrationSchema } from '@cv-builder/shared-utils';

interface RegistrationFormProps {
  onSubmit: (values: RegistrationFormValues) => Promise<void>;
  loading?: boolean;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const formik = useFormik<RegistrationFormValues>({
    initialValues: {
      username: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              id="contactNumber"
              name="contactNumber"
              label="Contact Number (Optional)"
              type="tel"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contactNumber &&
                Boolean(formik.errors.contactNumber)
              }
              helperText={
                formik.touched.contactNumber && formik.errors.contactNumber
              }
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>

          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              loading={loading}
              disabled={loading || !formik.isValid}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormikProvider>
  );
};
