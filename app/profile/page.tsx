import { auth } from '@/config/auth';

import { BetDatasource } from '@/data/datasources/betDatasource';
import { MatchesToday } from '../api/_types/matchesResponse';
import { Head } from './_components/Head';
import { Modal } from './_components/Modal';
import { BetCard } from './place-order/_components/BetCard';
import { env } from 'process';

export default async function ProfilePage() {
  const session = await auth();
  const bets = await BetDatasource.findAllByUserId(session!.user.id);

  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/matches`);
  const matchesToday: MatchesToday = await res.json();

  return (
    <>
      <Head />
      <section className='flex flex-col justify-center gap-4'></section>
      {bets.length === 0 ? (
        <div className='flex'>
          <span className='text-2xl text-gray-500'>
            <b>No tienes apuestas activas en este momento.</b>
          </span>
        </div>
      ) : (
        <div className='relative flex flex-wrap gap-3'>
          {bets.map((bet) => {
            const match = matchesToday.matches.find(
              (m) => m.id === bet.matchId,
            );

            return (
              <BetCard
                key={bet.id}
                id={bet.id}
                awayTeam={match?.awayTeam.name ?? 'Unknown'}
                homeTeam={match?.homeTeam.name ?? 'Unknown'}
                pick={bet.pick}
                placedAt={bet.placedAt}
                revenue={bet.return}
                stake={bet.stake}
                status={bet.status}
              />
            );
          })}
        </div>
      )}
      <Modal />
    </>
  );
}
