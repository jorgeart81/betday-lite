import { Order } from './_components/Order';

export default async function PlaceOrderPage() {

  return (
    <>
      <section className='relative flex flex-col justify-center gap-4'>
        <Order />
      </section>
    </>
  );
}
