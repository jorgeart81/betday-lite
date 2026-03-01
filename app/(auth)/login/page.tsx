import { LoginForm } from '../_components/LoginForm';

export default function LoginPage() {
  return (
    <section className='h-full flex flex-col justify-center gap-4'>
      <h1 className='font-title text-2xl md:text-3xl font-bold'>Login</h1>
      <LoginForm />
    </section>
  );
}
