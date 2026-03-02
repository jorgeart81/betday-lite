'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ComponentProps } from 'react';

import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BagIndicator } from './BagIndicator';
import { OpenDrawer } from './OpenDrawer';

interface Props extends ComponentProps<'nav'> {
  appName: string;
}

export const NavBar = ({ appName, className, ...props }: Props) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isProfile = pathname.startsWith('/profile');
  const isAuthenticated = !!session?.user;

  return (
    <nav className={`navbar bg-base-100 z-10 shadow-sm ${className}`} {...props}>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-xl'>
          {appName}
        </Link>
      </div>

      <div className='flex gap-2 items-center'>
        <OpenDrawer>
          <BagIndicator />
        </OpenDrawer>
        {!isAuthenticated && (
          <>
            <Link
              href='register'
              className='btn btn-sm flex items-center gap-2 hover:bg-green-500 hover:text-white'
            >
              Regístrate
            </Link>
            <Link
              href='login'
              className='btn btn-sm flex items-center gap-2 hover:bg-green-500 hover:text-white'
            >
              Inicia sesión
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            {!isProfile && (
              <Link
                href='/profile'
                className='btn btn-sm flex items-center gap-2 hover:bg-green-500 hover:text-white'
              >
                Mi Cuenta
              </Link>
            )}
            <button
              onClick={async () => {
                signOut({ redirectTo: '/' });
              }}
              className='btn btn-sm flex items-center gap-2 hover:bg-accent'
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
