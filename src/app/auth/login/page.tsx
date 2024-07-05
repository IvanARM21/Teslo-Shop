import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col p-10 rounded-md shadow-lg w-full">

      <h1 className={ `${ titleFont.className } text-4xl mb-5 font-black` }>Iniciar Sesión</h1>

      <LoginForm />
    </div>
  );
}