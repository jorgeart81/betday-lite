'use server';

import z from 'zod';

import { UserDatasource } from '@/data/datasources/userDatasoruce';
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
      fields.email,
      fields.password,
    );
    if (!user)
      return {
        success: false,
        message:
          'The registration could not be completed with the data provided.',
        data: fields,
      };

    return { success: true, message: undefined, data: undefined };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Something went wrong.',
      data: fields,
    };
  }
}
