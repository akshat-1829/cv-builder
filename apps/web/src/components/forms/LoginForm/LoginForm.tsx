// apps/cv-builder/src/components/forms/LoginForm/LoginForm.tsx
import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { useFormik, FormikProvider } from 'formik';
import { Button, TextField } from '@cv-builder/ui-theme';
import { LoginFormValues } from '@cv-builder/shared-types';
import { loginSchema } from '@cv-builder/shared-utils';

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  loading?: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      emailOrUsername: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              id="emailOrUsername"
              name="emailOrUsername"
              label="Email or Username"
              value={formik.values.emailOrUsername}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.emailOrUsername &&
                Boolean(formik.errors.emailOrUsername)
              }
              helperText={
                formik.touched.emailOrUsername && formik.errors.emailOrUsername
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              loading={loading}
              disabled={loading || !formik.isValid}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormikProvider>
  );
};
