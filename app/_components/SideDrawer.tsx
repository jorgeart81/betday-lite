'use client';
import { ReactNode } from 'react';

import { ArrowRight, ShoppingBag, Trash, Trophy } from 'lucide-react';

import { useCartStore } from '@/store/cart/cartStore';
import { Pick } from '../api/_types/betsResponse';

const PICK_LABEL: Record<Pick, string> = {
  AWAY: 'Visitante',
  DRAW: 'Empate',
  HOME: 'Local',
};
interface Props {
  children: ReactNode;
}

export const SideDrawer = ({ children }: Props) => {
  const cartMatches = useCartStore((state) => state.cartMatches);
  const removeMatch = useCartStore((state) => state.removeMatch);
  const changeStake = useCartStore((state) => state.changeStake);
  const resetStore = useCartStore((state) => state.reset);

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
        <div className='relative flex flex-col bg-base-100 min-h-full w-80 p-4'>
          {cartMatches.length === 0 ? (
            <div className='w-full flex-1 flex justify-center items-center'>
              <span className='inline-flex flex-col items-center gap-2 text-gray-500'>
                <ShoppingBag size={36} />
                Agrega apuestas a la bolsa
              </span>
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
                      <button className='btn btn-square btn-ghost'>
                        <Trash
                          size={16}
                          onClick={() => removeMatch(cart.match.id)}
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
                        Ganar:PEN {cart.result || '0.00'}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
