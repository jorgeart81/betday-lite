import { BetDatasource } from '@/data/datasources/betDatasource';
import { Head } from './_components/Head';
import { Modal } from './_components/Modal';
import { auth } from '@/config/auth';

export default async function LoginPage() {
  const session = await auth();
  const bets = await BetDatasource.findAllByUserId(session!.user.id);

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
        <>
          {bets.map((bet) => (
            <div key={bet.id}>{bet.matchId}</div>
          ))}
        </>
      )}
      <Modal />
    </>
  );
}
