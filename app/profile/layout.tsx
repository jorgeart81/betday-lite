import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/config/auth';
import { env } from 'process';

export const metadata: Metadata = {
  title: `${env.APP_NAME} | profile`,
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <main className='flex justify-center'>
      <pre>{JSON.stringify(session.user, undefined, 2)}</pre>
      {children}
    </main>
  );
}
