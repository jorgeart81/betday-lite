'use client';
import { useCartStore } from '@/store/cart/cartStore';
import { ShoppingBag } from 'lucide-react';

export const BagIndicator = () => {
  const cartMatches = useCartStore((state) => state.matches);

  return (
    <div className='indicator cursor-pointer'>
      {cartMatches.length > 0 && (
        <span className='indicator-item badge badge-secondary'>
          {cartMatches.length}
        </span>
      )}
      <ShoppingBag className='btn p-2' />
    </div>
  );
};
