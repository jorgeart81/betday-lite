'use server';

import z from 'zod';

import { signIn } from '@/config/auth';
import { UserDatasource } from '@/data/datasources/userDatasource';
import { FormState } from './common/formState';
import { SignupFormSchema, type SignupFormValues } from './common/validations';

export async function registerUserAction(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState | undefined> {
  const fields = Object.fromEntries(formData) as SignupFormValues;

  const validatedFields = SignupFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: 'Validation error.',
      errors: flattenedErrors.fieldErrors,
      data: fields,
    };
  }

  try {
    const user = await UserDatasource.create(
      fields.username,
      fields.email.toLowerCase(),
      fields.password,
    );
    if (!user)
      return {
        success: false,
        message:
          'The registration could not be completed with the data provided.',
        data: fields,
      };

    await signIn('credentials', {
      email: user.email,
      password: fields.password,
      redirect: false,
    });

    return {
      success: true,
      message: undefined,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Something went wrong.',
      data: fields,
    };
  }
}
