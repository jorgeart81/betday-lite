'use client';
import { LogOut } from 'lucide-react';

import { logout } from '@/app/(auth)/_actions/logout';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'nav'> {
  appName: string;
}

export const NavBar = ({ appName, className, ...props }: Props) => {
  return (
    <nav className={`navbar bg-base-100 shadow-sm ${className}`} {...props}>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>{appName}</a>
      </div>

      <div className='flex-none'>
        <button
          onClick={logout}
          className='btn btn-sm flex items-center gap-2 hover:bg-accent'
        >
          <LogOut size={18} /> <a>Logout</a>
        </button>
      </div>
    </nav>
  );
};
