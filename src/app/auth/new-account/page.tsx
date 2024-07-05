import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col p-10 rounded-md shadow-lg w-full">

      <h1 className={ `${ titleFont.className } text-4xl mb-5 font-black` }>Nueva Cuenta</h1>

      <RegisterForm />
    </div>
  );
}