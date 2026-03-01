import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/config/auth';
import { env } from 'process';
import { NavBar } from './_components/NavBar';

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
    <>
      <NavBar appName={env.APP_NAME ?? 'Dashboard'} className='h-16' />
      <main className='container flex just h-[calc(100vh-4rem)] mx-auto'>
        {children}
      </main>
    </>
  );
}
