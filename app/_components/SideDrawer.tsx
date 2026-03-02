'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const SideDrawer = ({ children }: Props) => {
  return (
    <div className='drawer drawer-end'>
      <input id='my-drawer-1' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {/* Page content here */}
        {children}
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-1'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-base-200 min-h-full w-80 p-4'>
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
