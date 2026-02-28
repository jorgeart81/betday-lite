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
            <span className='badge badge-ghost text-2xl font-semibold size-20 rounded-full'>
              {homeTeam.shortName}
            </span>
            <b>{homeTeam.name}</b>
          </div>

          <span className='badge badge-ghost text-lg'>vs</span>

          <div className='flex flex-col gap-2'>
            <span className='badge badge-ghost text-2xl font-semibold size-20 rounded-full'>
              {awayTeam.shortName}
            </span>
            <b>{awayTeam.name}</b>
          </div>
        </div>
        <div className='w-full flex card-actions'>
          <button className='flex-1 btn hover:bg-green-500 hover:text-white'>
            1 {market.odds.home}
          </button>
          <button className='flex-1 btn hover:bg-green-500 hover:text-white'>
            X {market.odds.draw}
          </button>
          <button className='flex-1 btn hover:bg-green-500 hover:text-white'>
            2 {market.odds.away}
          </button>
        </div>
      </div>
    </div>
  );
};
