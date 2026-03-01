'use client';
import { LogOut } from 'lucide-react';

import { logout } from '@/app/(auth)/_actions/logout';

interface Props {
  appName: string;
}

export const NavBar = ({ appName }: Props) => {
  return (
    <nav className='navbar bg-base-100 shadow-sm'>
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
