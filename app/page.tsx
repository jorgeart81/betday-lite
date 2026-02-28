import { env } from '@/config/env';
import { MatchCard } from './_components/MatchCard';
import { MatchesToday } from './api/_types/matchesResponse';

export default async function Home() {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/matches`);

  const data: MatchesToday = await res.json();
  const date = new Date(data.date);

  const formatted = date.toLocaleDateString('es-ES');

  return (
    <main>
      <header className='flex flex-col items-center'>
        <h1 className='text-3xl font-bold'>Matches</h1>
        <i className='text-lg'>{formatted}</i>
      </header>
      <section className='w-full flex flex-col items-center gap-4'>
        {data.matches.map((match) => (
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
      </section>
    </main>
  );
}
