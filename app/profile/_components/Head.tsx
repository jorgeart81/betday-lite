'use client';
import { useSession } from 'next-auth/react';

export const Head = () => {
  const { data: session } = useSession();
  return (
    <h1 className='font-title text-2xl md:text-3xl font-bold'>{session?.user.name} Profile</h1>
  );
};
