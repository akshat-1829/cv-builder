// libs/shared-types/src/lib/auth.types.ts
export interface User {
  id: string;
  username: string;
  email: string;
  contactNumber?: string;
  token: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

export interface CV {
  id: string;
  title: string;
  layoutId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}

export interface LoginFormValues {
  emailOrUsername: string;
  password: string;
}

export interface RegistrationFormValues {
  username: string;
  email: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
}
