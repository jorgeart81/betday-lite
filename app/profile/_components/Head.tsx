'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const Head = () => {
  const { data: session, update } = useSession();

  useEffect(() => {
    update();
  }, []);

  return (
    <h1 className='font-title text-2xl md:text-3xl font-bold'>
      {session?.user.name} Profile
    </h1>
  );
};
