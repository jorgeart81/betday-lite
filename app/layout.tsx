import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { env } from '@/config/env';
import { NavBar } from './_components/NavBar';
import { Provider } from './_components/provider/Provider';
import { SideDrawer } from './_components/SideDrawer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: env.APP_NAME,
  description: 'Apuestas simuladas ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' data-theme='emerald'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-screen`}
      >
        <Provider>
          <div className='grid grid-rows-[64_1fr] h-full'>
            <NavBar
              appName={env.APP_NAME ?? 'Dashboard'}
              className='fixed h-[64] row-start-0'
            />
            <div className='overflow-auto row-start-2'>
              <SideDrawer>{children}</SideDrawer>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
