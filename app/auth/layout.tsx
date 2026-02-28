import { Metadata } from 'next';
import { env } from 'process';

export const metadata: Metadata = {
  title: `${env.APP_NAME} | auth`,
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  // if (session?.user) {
  //   redirect('/');
  // }

  return (
    <main className='flex justify-center'>
      <div className='w-full sm:max-w-md px-10'>{children}</div>
    </main>
  );
}
