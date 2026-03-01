'use server';

import { signOut } from '@/config/auth';

export async function logout() {
  await signOut();
}
