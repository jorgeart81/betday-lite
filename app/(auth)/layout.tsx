import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/config/auth';
import { env } from 'process';

export const metadata: Metadata = {
  title: `${env.APP_NAME} | auth`,
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect('/profile');
  }

  return (
    <main className='h-full flex justify-center'>
      <div className='w-full sm:max-w-md px-10'>{children}</div>
    </main>
  );
}
