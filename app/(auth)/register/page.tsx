import { RegisterForm } from '../_components/RegisterForm';

export default function RegisterPage() {
  return (
    <section className='h-full flex flex-col justify-center gap-4'>
      <h1 className='font-title text-2xl md:text-3xl font-bold'>Register</h1>
      <RegisterForm />
    </section>
  );
}
