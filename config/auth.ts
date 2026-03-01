import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

import { z } from 'zod';
import { UserDatasource } from '@/data/datasources/userDatasource';
import bcryptjs from 'bcryptjs';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await UserDatasource.findByEmail(email);
        if (!user) return null;

        const { password: hashPassword, ...rest } = user;
        const isPasswordValid = bcryptjs.compareSync(password, hashPassword);
        if (!isPasswordValid) return null;

        return rest;
      },
    }),
  ],
});
