'use server';

import { AuthError } from 'next-auth';
import z from 'zod';

import { signIn } from '@/config/auth';
import { FormState } from './common/formState';
import { SigninFormSchema, type SigninFormValues } from './common/validations';

export async function authenticate(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState | undefined> {
  const fields = Object.fromEntries(formData) as SigninFormValues;

  const validatedFields = SigninFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: 'Validation error.',
      errors: flattenedErrors.fieldErrors,
      data: fields,
    } satisfies FormState;
  }

  try {
    await signIn('credentials', { ...fields });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Invalid credentials.',
            data: fields,
          };

        default:
          return {
            success: false,
            message: 'Something went wrong.',
            data: fields,
          };
      }
    }
    throw error;
  }
}
