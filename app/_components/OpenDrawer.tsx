import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const OpenDrawer = ({ children }: Props) => {
  return (
    <label htmlFor='my-drawer-1' className='drawer-button'>
      {children}
    </label>
  );
};
