'use client';
import { Clock } from 'lucide-react';
import { Match } from '../api/_types/matchesResponse';

export const MatchCard = ({
  league,
  startTime,
  homeTeam,
  awayTeam,
  market,
}: Match) => {
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

        <div className='w-full text-xl flex items-center justify-evenly p-4'>
          <div className='flex flex-col gap-2'>
            <span className='badge badge-ghost text-xl font-semibold size-20 rounded-full'>
              {homeTeam.shortName}
            </span>
            <b>{homeTeam.name}</b>
          </div>

          <div className='flex flex-col items-center gap-2'>
            <span className='badge badge-ghost text-lg'>vs</span>
            <span>{market.type}</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span className='badge badge-ghost text-xl font-semibold size-20 rounded-full'>
              {awayTeam.shortName}
            </span>
            <b>{awayTeam.name}</b>
          </div>
        </div>
        <div className='w-full flex card-actions'>
          <button className='flex-1 flex flex-col btn hover:bg-green-500 hover:text-white p-8'>
            <span>Home (1)</span>{' '}
            <span className='text-lg'>{market.odds.home}</span>
          </button>
          <button className='flex-1 flex flex-col btn hover:bg-green-500 hover:text-white p-8'>
            <span>Draw (X)</span>{' '}
            <span className='text-lg'>{market.odds.draw}</span>
          </button>
          <button className='flex-1 flex flex-col btn hover:bg-green-500 hover:text-white p-8'>
            <span>Away (2)</span>{' '}
            <span className='text-lg'>{market.odds.away}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
