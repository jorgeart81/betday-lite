'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { ArrowRight, Link, ShoppingBag, Trash, Trophy } from 'lucide-react';

import { Pick } from '@/app/api/_types/betsResponse';
import { NewBetOptions } from '@/data/datasources/betDatasource';
import { useCartStore } from '@/store/cart/cartStore';
import { placeOrder } from '../../_actions/place-order';

const PICK_LABEL: Record<Pick, string> = {
  AWAY: 'Visitante',
  DRAW: 'Empate',
  HOME: 'Local',
};

export const Order = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const cartMatches = useCartStore((state) => state.cartMatches);
  const removeMatch = useCartStore((state) => state.removeMatch);
  const changeStake = useCartStore((state) => state.changeStake);

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

  const handlePlaceOrder = () => {
    startTransition(async () => {
      const result = await placeOrder(
        cartMatches
          .filter((cm) => cm.stake !== null)
          .map(
            (cm): NewBetOptions => ({
              matchId: cm.match.id,
              pick: cm.pick,
              odd: cm.match.market.odds[
                cm.pick.toLowerCase() as keyof typeof cm.match.market.odds
              ],
              stake: cm.stake!,
            }),
          ),
      );

      if (result.data) result.data.forEach((item) => removeMatch(item.matchId));
      router.push('/profile');
    });
  };

  return (
    <>
      {isPending && (
        <div className='absolute w-full h-screen z-10 text-gray-800'>
          <div className='relative h-full flex flex-col justify-center items-center'>
            <div className='bg-gray-900/10 rounded-full size-50  p-8 flex flex-col items-center justify-center'>
              <div>
                <span className='loading loading-ball loading-xs'></span>
                <span className='loading loading-ball loading-sm'></span>
                <span className='loading loading-ball loading-md'></span>
                <span className='loading loading-ball loading-lg'></span>
                <span className='loading loading-ball loading-xl'></span>
              </div>
              <span className='font-bold'>Procesando</span>
            </div>
          </div>
        </div>
      )}

      {cartMatches.length === 0 ? (
        <div className='w-full flex-1 flex justify-center items-center'>
          <Link
            href='/'
            className='inline-flex flex-col items-center gap-2 text-gray-500'
          >
            <ShoppingBag size={36} />
            Agrega apuestas a la bolsa
          </Link>
        </div>
      ) : (
        <>
          <h1 className='p-4 pb-2 text-2xl font-bold'>
            Apuesta {cartMatches.length === 1 && 'Simple'}
            {cartMatches.length > 1 && 'Multiple'}
          </h1>

          <ul className='flex flex-row justify-around flex-wrap p-4 gap-2 list rounded-box shadow-md'>
            {cartMatches.map((cart) => (
              <li
                key={cart.match.id}
                className='w-full md:w-md list-row flex flex-col border-2 border-green-200'
              >
                <div className='flex justify-between'>
                  <div className='inline-flex gap-2 items-center'>
                    <Trophy size={14} />
                    <span className='font-bold'>
                      {cart.match.homeTeam.name} vs {cart.match.awayTeam.name} (
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
            onClick={handlePlaceOrder}
            disabled={isPending}
            className='btn bg-green-500 text-white my-3 hover:bg-green-600 disabled:bg-gray-300'
          >
            Comprar
          </button>
        </>
      )}
    </>
  );
};
