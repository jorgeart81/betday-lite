export type FormState = {
  success?: boolean;
  message?: string;
  data?: {
    username?: string;
    email?: string;
    password?: string;
  };
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  } | null;
};