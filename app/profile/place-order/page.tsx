import { BetDatasource } from '@/data/datasources/betDatasource';

import { auth } from '@/config/auth';
import { Order } from './_components/Order';

export default async function PlaceOrderPage() {
  const session = await auth();
  const bets = await BetDatasource.findAllByUserId(session!.user.id);

  return (
    <>
      <section className='relative flex flex-col justify-center gap-4'>
        <Order />
      </section>
    </>
  );
}
