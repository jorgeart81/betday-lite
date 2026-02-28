import { env } from '@/config/env';
import { MatchCard } from './_components/MatchCard';
import { Match, MatchesToday } from './api/_types/matchesResponse';
import { Clock } from 'lucide-react';

export default async function Home() {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/matches`);

  const data: MatchesToday = await res.json();
  const date = new Date(data.date);

  const formatted = date.toLocaleDateString('es-ES');
  const matchesMap = data.matches.reduce(
    (acc, current) => {
      const date = new Date(current.startTime);
      const day = date.getDate();
      const hour = date.getHours();

      acc[day] ??= {};
      acc[day][hour] ??= [];
      acc[day][hour].push(current);

      return acc;
    },
    {} as Record<number, Record<number, Array<Match>>>,
  );

  console.log({ matchesMap });

  return (
    <main>
      <header className='flex flex-col items-center'>
        <h1 className='text-3xl font-bold'>Matches</h1>
        <i className='text-lg'>{formatted}</i>
      </header>

      <section className='w-full flex flex-col gap-4'>
        {Object.entries(matchesMap).map(([day, hours]) => (
          <div key={day} className='w-full flex flex-col items-center'>
            <h2 className='p-4 pb-2 text-lg opacity-60 tracking-wide'>
              Day {day}
            </h2>

            {Object.entries(hours).map(([hour, matches]) => (
              <div
                key={hour}
                className='relative w-full max-w-3xl flex flex-col items-center gap-2 p-4 md:p-8 border-l-2 border-gray-300'
              >
                <div className='absolute -left-4 -top-4'>
                  <div className='relative flex items-center gap-2'>
                    <Clock className='size-8 p-1 badge badge-neutral' />

                    <span className='badge badge-xl'>
                      <b>{hour}:00</b>
                    </span>
                  </div>
                </div>

                {matches.map((match) => (
                  <MatchCard
                    key={match.id}
                    id={match.id}
                    startTime={match.startTime}
                    league={match.league}
                    homeTeam={match.homeTeam}
                    awayTeam={match.awayTeam}
                    market={match.market}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
