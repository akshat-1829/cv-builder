// validation/cvValidation.schema.ts

import * as Yup from 'yup';

export const basicDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: Yup.string()
    .required('Address is required')
    .max(200, 'Address must not exceed 200 characters'),
  city: Yup.string()
    .required('City is required')
    .max(50, 'City must not exceed 50 characters'),
  state: Yup.string()
    .required('State is required')
    .max(50, 'State must not exceed 50 characters'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  summary: Yup.string()
    .required('Summary is required')
    .min(50, 'Summary must be at least 50 characters')
    .max(500, 'Summary must not exceed 500 characters'),
  image: Yup.string().url('Invalid image URL').nullable(),
});

export const educationSchema = Yup.object().shape({
  degree: Yup.string()
    .required('Degree is required')
    .max(100, 'Degree must not exceed 100 characters'),
  institution: Yup.string()
    .required('Institution is required')
    .max(150, 'Institution must not exceed 150 characters'),
  percentage: Yup.number()
    .required('Percentage is required')
    .min(0, 'Percentage must be at least 0')
    .max(100, 'Percentage must not exceed 100'),
  startDate: Yup.date()
    .required('Start date is required')
    .max(new Date(), 'Start date cannot be in the future'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be after start date'),
});

export const experienceSchema = Yup.object().shape({
  organization: Yup.string()
    .required('Organization is required')
    .max(150, 'Organization must not exceed 150 characters'),
  position: Yup.string()
    .required('Position is required')
    .max(100, 'Position must not exceed 100 characters'),
  location: Yup.string()
    .required('Location is required')
    .max(100, 'Location must not exceed 100 characters'),
  ctc: Yup.string()
    .required('CTC is required')
    .max(50, 'CTC must not exceed 50 characters'),
  startDate: Yup.date()
    .required('Start date is required')
    .max(new Date(), 'Start date cannot be in the future'),
  endDate: Yup.date()
    .nullable()
    .min(Yup.ref('startDate'), 'End date must be after start date'),
  technologies: Yup.array()
    .of(Yup.string().required('Technology name is required'))
    .min(1, 'At least one technology is required')
    .required('Technologies are required'),
});

export const projectSchema = Yup.object().shape({
  title: Yup.string()
    .required('Project title is required')
    .max(150, 'Project title must not exceed 150 characters'),
  teamSize: Yup.number()
    .required('Team size is required')
    .min(1, 'Team size must be at least 1')
    .max(1000, 'Team size must not exceed 1000'),
  duration: Yup.string()
    .required('Duration is required')
    .max(50, 'Duration must not exceed 50 characters'),
  technologies: Yup.array()
    .of(Yup.string().required('Technology name is required'))
    .min(1, 'At least one technology is required')
    .required('Technologies are required'),
  description: Yup.string()
    .required('Description is required')
    .min(50, 'Description must be at least 50 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
});

export const skillSchema = Yup.object().shape({
  name: Yup.string()
    .required('Skill name is required')
    .max(100, 'Skill name must not exceed 100 characters'),
  percentage: Yup.number()
    .required('Percentage is required')
    .min(0, 'Percentage must be at least 0%')
    .max(100, 'Percentage must not exceed 100%'),
});

export const socialProfileSchema = Yup.object().shape({
  platform: Yup.string()
    .required('Platform name is required')
    .max(50, 'Platform name must not exceed 50 characters'),
  url: Yup.string()
    .required('URL is required')
    .url('Invalid URL format')
    .max(200, 'URL must not exceed 200 characters'),
});

export const cvFormValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('CV title is required')
    .min(3, 'CV title must be at least 3 characters')
    .max(100, 'CV title must not exceed 100 characters'),
  basicDetails: basicDetailsSchema,
  education: Yup.array()
    .of(educationSchema)
    .min(1, 'At least one education entry is required'),
  experience: Yup.array().of(experienceSchema),
  projects: Yup.array().of(projectSchema),
  skills: Yup.array().of(skillSchema),
  socialProfiles: Yup.array().of(socialProfileSchema),
});
