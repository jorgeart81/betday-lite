import { headers } from 'next/headers';
import { env } from '@/config/env';

export async function getBaseUrl(): Promise<string> {
  if (env.NEXT_PUBLIC_API_URL?.trim()) {
    return env.NEXT_PUBLIC_API_URL;
  }

  const headersList = headers();
  const host = (await headersList).get('host');
  const protocol = (await headersList).get('x-forwarded-proto') ?? 'http';

  return `${protocol}://${host}`;
}
