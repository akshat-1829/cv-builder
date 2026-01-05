// components/CVForm/BasicDetailsForm.tsx

import React from 'react';
import { useFormikContext } from 'formik';
import { Grid, Box } from '@mui/material';
import { CVData } from '@cv-builder/shared-types';
import { TextField } from '@cv-builder/ui-theme';

const BasicDetailsForm: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<CVData>();

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            name="basicDetails.image"
            label="Profile Image URL"
            value={values.basicDetails.image || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.image && Boolean(errors.basicDetails?.image)
            }
            helperText={
              touched.basicDetails?.image && errors.basicDetails?.image
            }
          />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <TextField
            fullWidth
            required
            name="basicDetails.firstName"
            label="First Name"
            value={values.basicDetails.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.firstName &&
              Boolean(errors.basicDetails?.firstName)
            }
            helperText={
              touched.basicDetails?.firstName && errors.basicDetails?.firstName
            }
          />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <TextField
            fullWidth
            required
            name="basicDetails.lastName"
            label="Last Name"
            value={values.basicDetails.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.lastName &&
              Boolean(errors.basicDetails?.lastName)
            }
            helperText={
              touched.basicDetails?.lastName && errors.basicDetails?.lastName
            }
          />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <TextField
            fullWidth
            required
            name="basicDetails.email"
            label="Email Address"
            type="email"
            value={values.basicDetails.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.email && Boolean(errors.basicDetails?.email)
            }
            helperText={
              touched.basicDetails?.email && errors.basicDetails?.email
            }
          />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <TextField
            fullWidth
            required
            name="basicDetails.phone"
            label="Phone Number"
            value={values.basicDetails.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.phone && Boolean(errors.basicDetails?.phone)
            }
            helperText={
              touched.basicDetails?.phone && errors.basicDetails?.phone
            }
          />
        </Grid>

        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            required
            name="basicDetails.address"
            label="Address"
            value={values.basicDetails.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.address &&
              Boolean(errors.basicDetails?.address)
            }
            helperText={
              touched.basicDetails?.address && errors.basicDetails?.address
            }
          />
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <TextField
            fullWidth
            required
            name="basicDetails.city"
            label="City"
            value={values.basicDetails.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.city && Boolean(errors.basicDetails?.city)
            }
            helperText={touched.basicDetails?.city && errors.basicDetails?.city}
          />
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <TextField
            fullWidth
            required
            name="basicDetails.state"
            label="State"
            value={values.basicDetails.state}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.state && Boolean(errors.basicDetails?.state)
            }
            helperText={
              touched.basicDetails?.state && errors.basicDetails?.state
            }
          />
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <TextField
            fullWidth
            required
            name="basicDetails.pincode"
            label="Pincode"
            value={values.basicDetails.pincode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.pincode &&
              Boolean(errors.basicDetails?.pincode)
            }
            helperText={
              touched.basicDetails?.pincode && errors.basicDetails?.pincode
            }
          />
        </Grid>

        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            name="basicDetails.summary"
            label="Professional Summary"
            placeholder="Write a brief summary about yourself..."
            value={values.basicDetails.summary}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.summary &&
              Boolean(errors.basicDetails?.summary)
            }
            helperText={
              touched.basicDetails?.summary && errors.basicDetails?.summary
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicDetailsForm;
