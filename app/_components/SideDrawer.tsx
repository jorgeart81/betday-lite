'use client';
import { ReactNode, useRef } from 'react';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { ArrowRight, ShoppingBag, Trash, Trophy } from 'lucide-react';

import { useCartStore } from '@/store/cart/cartStore';
import { Pick } from '../api/_types/betsResponse';
import { useRouter } from 'next/navigation';

const PICK_LABEL: Record<Pick, string> = {
  AWAY: 'Visitante',
  DRAW: 'Empate',
  HOME: 'Local',
};
interface Props {
  children: ReactNode;
}

export const SideDrawer = ({ children }: Props) => {
  const drawerToggleRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { data: session } = useSession();

  const cartMatches = useCartStore((state) => state.cartMatches);
  const removeMatch = useCartStore((state) => state.removeMatch);
  const changeStake = useCartStore((state) => state.changeStake);
  const resetStore = useCartStore((state) => state.reset);

  const currency = 'PEN';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    matchId: string,
  ) => {
    const val = e.target.value;

    if (val.trim().length == 0) {
      changeStake(matchId, null);
      return;
    }

    if (/^\d*\.?\d{0,2}$/.test(val)) {
      changeStake(matchId, Number(val));
    }
  };

  const handlePlaceBet = () => {
    const isAuthenticated = !!session?.user;
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  };

  return (
    <div className='drawer drawer-end h-full'>
      <input
        ref={drawerToggleRef}
        id='my-drawer-1'
        type='checkbox'
        className='drawer-toggle'
      />
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
        {/* Sidebar container */}
        <div className='relative flex flex-col bg-base-100 min-h-full w-80 p-4'>
          {/* Sidebar content */}
          {cartMatches.length === 0 ? (
            <div className='w-full flex-1 flex justify-center items-center'>
              <Link
                href='/'
                onClick={() => {
                  if (drawerToggleRef.current) {
                    drawerToggleRef.current.checked = false;
                  }
                }}
                className='inline-flex flex-col items-center gap-2 text-gray-500'
              >
                <ShoppingBag size={36} />
                Agrega apuestas a la bolsa
              </Link>
            </div>
          ) : (
            <>
              <p className='p-4 pb-2 text-lg tracking-wide'>
                {cartMatches.length === 1 && 'Simple'}
                {cartMatches.length > 1 && 'Multiple'}
              </p>
              <ul className='flex flex-col gap-2 list rounded-box shadow-md'>
                {cartMatches.map((cart) => (
                  <li
                    key={cart.match.id}
                    className='list-row flex flex-col border border-gray-200'
                  >
                    <div className='flex justify-between'>
                      <div className='inline-flex gap-2 items-center'>
                        <Trophy size={14} />
                        <span className='font-bold'>
                          {cart.match.homeTeam.name} vs{' '}
                          {cart.match.awayTeam.name} (
                          <span>{cart.match.market.type}</span>)
                        </span>
                      </div>
                      <button
                        onClick={() => removeMatch(cart.match.id)}
                        className='btn btn-square size-9 group'
                      >
                        <Trash
                          size={16}
                          className='text-gray group-hover:text-red-500 transition-colors'
                        />
                      </button>
                    </div>
                    <div className='flex justify-end items-center'>
                      <span>{PICK_LABEL[cart.pick]} </span>
                      <ArrowRight size={16} className='mr-1' />
                      <span>
                        {
                          cart.match.market.odds[
                            cart.pick.toLowerCase() as keyof typeof cart.match.market.odds
                          ]
                        }
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <input
                        type='number'
                        placeholder='10.00'
                        value={cart.stake ?? ''}
                        onChange={(e) => handleChange(e, cart.match.id)}
                        className='max-w-28 input input-sm appearance-none [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden'
                      />
                      <span className='font-semibold'>
                        Ganar:{currency} {cart.result || '0.00'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={resetStore}
                className='w-full btn btn-outline my-4'
              >
                Limpiar todo <Trash size={16} onClick={() => {}} />
              </button>

              <div className='inline-flex justify-between'>
                <span>Apuesta Total </span>{' '}
                <b>
                  {currency}{' '}
                  {cartMatches
                    .reduce((acc, current) => acc + (current.stake || 0), 0)
                    .toFixed(2)}
                </b>
              </div>
              <div className='inline-flex justify-between'>
                <span>Ganancia Total </span>{' '}
                <b>
                  {currency}{' '}
                  {cartMatches
                    .reduce((acc, current) => acc + (current.result || 0), 0)
                    .toFixed(2)}
                </b>
              </div>

              <button
                onClick={handlePlaceBet}
                className='btn bg-green-500 text-white my-3 hover:bg-green-600'
              >
                Realizar apuesta
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
