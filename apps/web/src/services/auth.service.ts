import { RegistrationFormValues } from '@cv-builder/shared-types';
import { sendRequest } from '../utils/apiClient';
import { ApiEndpoints } from '../utils/apiEndpoints';
import { config } from '../config/env';

export const signInService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await sendRequest({
    url: ApiEndpoints.Auth.SIGN_IN,
    method: 'POST',
    data: { email, password },
    successMessage: 'Signed in successfully!',
  });
};

export const signUpService = async (data: RegistrationFormValues) => {
  return await sendRequest({
    url: ApiEndpoints.Auth.SIGN_UP,
    method: 'POST',
    data,
    successMessage: 'Signed up successfully!',
  });
};

export const getCurrentUserService = async () => {
  return await sendRequest({
    url: ApiEndpoints.Auth.GET_CURRENT_USER,
    method: 'GET',
  });
}

export const signInWithGoogleRedirect = () => {
  window.location.href = `${config.apiBaseUrl}${ApiEndpoints.Auth.GOOGLE_OAUTH}`;
};

export const signInWithFacebookRedirect = () => {
  window.location.href = `${config.apiBaseUrl}${ApiEndpoints.Auth.FACEBOOK_OAUTH}`;
};
