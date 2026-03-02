import React from 'react';

export default function Loading() {
  return (
    <div className='absolute w-screen h-screen flex justify-center items-center z-20'>
      <span className='loading loading-ring loading-xl'></span>
    </div>
  );
}
