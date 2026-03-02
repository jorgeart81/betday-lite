'use client';

import { Pick } from '@/app/api/_types/betsResponse';
import clsx from 'clsx';
import { HandCoins } from 'lucide-react';

const PICK_LABEL: Record<Pick, string> = {
  AWAY: 'Visitante',
  DRAW: 'Empate',
  HOME: 'Local',
};

interface Props {
  id: string;
  awayTeam: string;
  homeTeam: string;
  placedAt: Date;
  stake: number;
  status: string;
  pick: Pick;
  revenue: number | null;
}

export const BetCard = ({
  id,
  awayTeam,
  homeTeam,
  placedAt,
  stake,
  status,
  pick,
  revenue,
}: Props) => {
  const currency = 'PEN';

  return (
    <a href='#' className='hover-3d my-12 mx-2 cursor-pointer'>
      {/* content */}
      <div
        className={clsx(
          'card w-96 text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]',
          {
            'bg-red-800/90': status === 'LOST',
          },
          {
            'bg-amber-700': status === 'PENDING',
          },
          {
            'bg-green-800/90': status === 'WON',
          },
        )}
      >
        <div className='card-body'>
          <div className='flex justify-between mb-4'>
            <div className='font-bold'>Estado: {status}</div>
          </div>
          <div className='text-lg'>Local: {homeTeam}</div>
          <div className='text-lg mb-4'>Visita: {awayTeam}</div>
          <div className='flex justify-between'>
            {/* Stake */}
            <div>
              <div className='text-xs opacity-80'>Apuesta</div>
              <div>
                <span>{PICK_LABEL[pick]}</span> <br />
                <span>
                  {currency} {stake}
                </span>
              </div>
            </div>
            {/* Date */}
            <div>
              <div className='text-xs opacity-80'>Fecha</div>
              <div>
                <span>
                  {placedAt.toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
            </div>
            {/* Revenue */}
            <div>
              <div className='text-md opacity-80 inline-flex items-center gap-2'>
                Cuota
                <HandCoins />
              </div>
              <div className='text-lg'>
                {currency} {revenue}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8 empty divs needed for the 3D effect */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </a>
  );
};
