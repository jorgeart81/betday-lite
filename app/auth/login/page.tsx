import { LoginForm } from '../_components/LoginForm';

export default function LoginPage() {
  return (
    <section className='flex flex-col justify-center gap-4 min-h-screen'>
      <h1 className='font-title text-2xl md:text-3xl font-bold'>Ingresar</h1>
      <LoginForm />
    </section>
  );
}
