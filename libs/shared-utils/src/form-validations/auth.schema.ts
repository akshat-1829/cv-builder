// libs/shared-utils/src/validation/auth.schema.ts
import * as Yup from 'yup';

export const registrationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers and underscore',
    )
    .required('Username is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  contactNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number')
    .notRequired(),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number and special character',
    )
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm password'),
});

export const loginSchema = Yup.object({
  emailOrUsername: Yup.string().required('Email or username is required'),

  password: Yup.string().required('Password is required'),
});
