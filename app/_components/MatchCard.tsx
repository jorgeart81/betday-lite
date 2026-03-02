'use client';
import { Clock } from 'lucide-react';

import clsx from 'clsx';

import { useCartStore } from '@/store/cart/cartStore';
import { Match } from '../api/_types/matchesResponse';

interface Props {
  match: Match;
}

export const MatchCard = ({ match }: Props) => {
  const { league, startTime, homeTeam, awayTeam, market } = match;
  const cartMatches = useCartStore((state) => state.cartMatches);
  const addMatch = useCartStore((state) => state.addMatch);
  const cartMatch = cartMatches.find((cart) => cart.match.id === match.id);

  const date = new Date(startTime);
  const formatted = date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className='card card-dash bg-base-100 w-full max-w-3xl'>
      <div className='card-body'>
        <div className='flex justify-between'>
          <span className='badge badge-soft badge-success'>{league.name}</span>{' '}
          <span className='inline-flex gap-2 badge'>
            <Clock size={14} /> {formatted}
          </span>
        </div>

        <div className='w-full text-lg lg:text-xl flex flex-col md:flex-row items-center justify-evenly p-4'>
          <div className='flex flex-col justify-center gap-2'>
            <span className='hidden md:inline-flex badge badge-ghost text-xl font-semibold size-16 lg:size-20 rounded-full'>
              {homeTeam.shortName}
            </span>
            <b>{homeTeam.name}</b>
          </div>

          <div className='flex md:flex-col items-center gap-2'>
            <span className='badge badge-ghost text-lg'>vs</span>
            <span>{market.type}</span>
          </div>

          <div className='flex flex-col items-center gap-2'>
            <span className='hidden md:inline-flex badge badge-ghost text-xl font-semibold size-16 lg:size-20 rounded-full'>
              {awayTeam.shortName}
            </span>
            <b>{awayTeam.name}</b>
          </div>
        </div>
        <div className='w-full flex flex-col md:flex-row gap-2'>
          <button
            onClick={() => addMatch({ match: match, pick: 'HOME', stake: 10 })}
            className={clsx(
              'flex-1 flex flex-col btn hover:bg-green-500 hover:text-white p-2 lg:p-8',
              { 'bg-green-500 text-white': cartMatch?.pick === 'HOME' },
            )}
          >
            <span>Home (1)</span>{' '}
            <span className='text-lg'>{market.odds.home}</span>
          </button>
          <button
            onClick={() => addMatch({ match: match, pick: 'DRAW', stake: 10 })}
            className={clsx(
              'flex-1 flex flex-col btn hover:bg-green-500 hover:text-white p-2 lg:p-8',
              { 'bg-green-500 text-white': cartMatch?.pick === 'DRAW' },
            )}
          >
            <span>Draw (X)</span>{' '}
            <span className='text-lg'>{market.odds.draw}</span>
          </button>
          <button
            onClick={() => addMatch({ match: match, pick: 'AWAY', stake: 10 })}
            className={clsx(
              'flex-1 flex flex-col btn hover:bg-green-500 hover:text-white p-2 lg:p-8',
              { 'bg-green-500 text-white': cartMatch?.pick === 'AWAY' },
            )}
          >
            <span>Away (2)</span>{' '}
            <span className='text-lg'>{market.odds.away}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
