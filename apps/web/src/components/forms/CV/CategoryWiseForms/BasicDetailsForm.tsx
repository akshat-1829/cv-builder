// src/components/CVForm/BasicDetailsForm.tsx

import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import {
  Grid,
  Box,
  Avatar,
  IconButton,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { CVData } from '@cv-builder/shared-types';
import { Button, TextField } from '@cv-builder/ui-theme';

const BasicDetailsForm: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
  useFormikContext<CVData>();

  const [imagePreview, setImagePreview] = useState<string>(
    values.basicDetails.image || '',
  );
  const [uploadError, setUploadError] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    console.log('=== BasicDetailsForm Render ===');
    console.log('Current values:', values);
    console.log(
      'First Name value:',
      values.basicDetails.firstName,
    );
    console.log('Handle Change:', typeof handleChange);
  }, [values]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Client-side validation
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload a valid image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Image size should be less than 2MB');
      return;
    }

    setUploadError('');
    setUploading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);

      // Upload to server
      const response = await fetch(
        'http://localhost:5000/api/upload/profile-image',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      const imageUrl = `http://localhost:5000${data.imageUrl}`; // Full URL with server

      setImagePreview(imageUrl);
      setFieldValue('basicDetails.image', imageUrl);

      console.log('Image uploaded successfully:', imageUrl);
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(
        error.message || 'Failed to upload image. Please try again.',
      );
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleRemoveImage = async () => {
    const currentImage = values.basicDetails.image;

    // Remove from server if it's a server-hosted image
    if (currentImage && currentImage.includes('/uploads/profile-images/')) {
      try {
        const response = await fetch(
          'http://localhost:5000/api/upload/profile-image',
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: currentImage }),
          },
        );

        if (!response.ok) {
          console.error('Failed to delete image from server');
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }

    setImagePreview('');
    setFieldValue('basicDetails.image', '');
    setUploadError('');
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Profile Image Upload */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              p: 3,
              border: '2px dashed',
              borderColor: uploadError ? 'error.main' : 'divider',
              borderRadius: 2,
              bgcolor: 'background.default',
              transition: 'all 0.3s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover',
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={imagePreview}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                  border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: 2,
                }}
              >
                {!imagePreview &&
                  (values.basicDetails.firstName?.[0]?.toUpperCase() || (
                    <PhotoCameraIcon sx={{ fontSize: '3rem' }} />
                  ))}
              </Avatar>

              {uploading && (
                <CircularProgress
                  size={130}
                  sx={{
                    position: 'absolute',
                    top: -5,
                    left: -5,
                    color: 'primary.main',
                  }}
                />
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                disabled={uploading}
                size="medium"
              >
                {uploading
                  ? 'Uploading...'
                  : imagePreview
                    ? 'Change Photo'
                    : 'Upload Photo'}
                <input
                  type="file"
                  hidden
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </Button>

              {imagePreview && !uploading && (
                <IconButton
                  color="error"
                  onClick={handleRemoveImage}
                  size="medium"
                  sx={{
                    border: '1px solid',
                    borderColor: 'error.main',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Recommended: Square image (1:1 ratio)
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Max size: 2MB • Formats: JPG, PNG, GIF, WebP
              </Typography>
            </Box>

            {uploadError && (
              <Alert
                severity="error"
                sx={{ width: '100%' }}
                onClose={() => setUploadError('')}
              >
                {uploadError}
              </Alert>
            )}

            {uploading && (
              <Alert severity="info" sx={{ width: '100%' }}>
                Uploading image... Please wait.
              </Alert>
            )}
          </Box>
        </Grid>

        {/* Name Fields */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name="basicDetails.firstName"
            label="First Name"
            placeholder="John"
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

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name="basicDetails.lastName"
            label="Last Name"
            placeholder="Doe"
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

        {/* Contact Fields */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name="basicDetails.email"
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
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

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            name="basicDetails.phone"
            label="Phone Number"
            placeholder="+91 98765 43210"
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

        {/* Address Fields */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            required
            name="basicDetails.address"
            label="Street Address"
            placeholder="123 Main Street, Apartment 4B"
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

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            required
            name="basicDetails.city"
            label="City"
            placeholder="Mumbai"
            value={values.basicDetails.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.basicDetails?.city && Boolean(errors.basicDetails?.city)
            }
            helperText={touched.basicDetails?.city && errors.basicDetails?.city}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            required
            name="basicDetails.state"
            label="State/Province"
            placeholder="Maharashtra"
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

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            required
            name="basicDetails.pincode"
            label="Pincode/ZIP"
            placeholder="400001"
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

        {/* Professional Summary */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            name="basicDetails.summary"
            label="Professional Summary"
            placeholder="Write a brief summary highlighting your key skills, experience, and career objectives..."
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
