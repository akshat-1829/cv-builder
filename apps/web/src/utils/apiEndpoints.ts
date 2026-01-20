export const ApiEndpoints = {
  Auth: {
    SIGN_IN: '/auth/login',
    SIGN_UP: '/auth/register',
    GET_CURRENT_USER: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
    GOOGLE_OAUTH: '/auth/google',
    GOOGLE_CALLBACK: '/auth/google/callback',
    FACEBOOK_OAUTH: '/auth/facebook',
    FACEBOOK_CALLBACK: '/auth/facebook/callback',
  },
  Cv: {
    GET_CV: '/cv/get-all-cv',
    CREATE_CV: '/cv/create-cv',
    UPDATE_CV: '/cv/update-cv',
    DELETE_CV: '/cv/delete-cv',
  },
  Upload: {
    PROFILE_IMAGE: '/upload/profile-image',
  },
  Payment: {
    PROCESS_PAYMENT: '/payment/create',
    // PAYMENT_STATUS: '/payment/status',
  },
};
