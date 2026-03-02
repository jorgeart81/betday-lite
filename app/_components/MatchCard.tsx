'use client';
import { Clock } from 'lucide-react';

import { useCartStore } from '@/store/cart/cartStore';
import { Match } from '../api/_types/matchesResponse';

export const MatchCard = (match: Match) => {
  const { league, startTime, homeTeam, awayTeam, market } = match;
  const addMatch = useCartStore((state) => state.addMatch);

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
            onClick={() => addMatch({ match: match, pick: 'HOME' })}
            className='flex-1 flex flex-col btn hover:bg-green-500 hover:text-white p-2 lg:p-8'
          >
            <span>Home (1)</span>{' '}
            <span className='text-lg'>{market.odds.home}</span>
          </button>
          <button
            onClick={() => addMatch({ match: match, pick: 'DRAW' })}
            className='flex-1 flex flex-col btn hover:bg-green-500 hover:text-white p-2 lg:p-8'
          >
            <span>Draw (X)</span>{' '}
            <span className='text-lg'>{market.odds.draw}</span>
          </button>
          <button
            onClick={() => addMatch({ match: match, pick: 'AWAY' })}
            className='flex-1 flex flex-col btn hover:bg-green-500 hover:text-white p-2 lg:p-8'
          >
            <span>Away (2)</span>{' '}
            <span className='text-lg'>{market.odds.away}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
