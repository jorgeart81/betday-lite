'use client';

import { authenticate } from '@/actions/auth/login';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

export const RegisterForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <>
      <form
        noValidate
        action={formAction}
        className='fieldset bg-base-200 border-base-300 rounded-box border p-4'
      >
        <label className='label'>Email</label>
        <input
          name='email'
          type='email'
          className='input w-full'
          placeholder='email@dominio.com'
        />

        <label className='label'>Password</label>
        <input
          name='password'
          type='password'
          className='input w-full'
          placeholder='Password'
        />

        <input type='hidden' name='redirectTo' value={callbackUrl} />
        <button className='btn btn-neutral mt-4' disabled={isPending}>
          Crear
        </button>
      </form>

      {errorMessage && (
        <>
          <div role='alert' className='alert alert-error'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 shrink-0 stroke-current'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        </>
      )}
    </>
  );
};
