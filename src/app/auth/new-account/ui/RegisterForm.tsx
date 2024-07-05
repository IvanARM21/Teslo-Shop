'use client';

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {


  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>();

  const onSubmit = async (data : FormInputs) => {
      const { name, email, password } = data;

      // Server Action
      const resp = await registerUser(name, email, password);

      if(!resp.ok) {
        setErrorMessage(resp.message)
        return;
      }
      setErrorMessage('');

      await login(email.toLowerCase().trim(), password);
      window.location.replace('/');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label htmlFor="email">Nombre Completo</label>
        <input
          className={
            clsx(
              "p-2 mt-2 shadow-md bg-slate-50 rounded-md mb-5",
              {
                'border-red-500 border-2': !!errors.name
              }
            )
          }
          type="text"
          placeholder="Tú Nombre Completo"
          autoFocus
          {...register('name', { required: true })}
        />

      <label htmlFor="email">Correo electrónico</label>
        <input
          className={
            clsx(
              "p-2 mt-2 shadow-md bg-slate-50 rounded-md mb-5",
              {
                'border-red-500 border-2': !!errors.email
              }
            )
          }
          type="email" 
          placeholder="Tú Correo Electrónico"
          {...register('email', { 
            required: true, 
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
          })}
        
        />


        <label htmlFor="email">Contraseña</label>
        <input
          className={
            clsx(
              "p-2 mt-2 shadow-md bg-slate-50 rounded-md mb-5",
              {
                'border-red-500 border-2': !!errors.password
              }
            )
          }
          type="password"
          placeholder="Tú Contraseña" 
          {...register('password', { required: true, minLength: 8 })}
        />

        <span className="text-red-500 text-center mb-5">{errorMessage}</span>

        <button
          type="submit"
          className="btn-primary"
        >Crear Cuenta</button>

        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"/>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"/>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          Ingresar
        </Link>

      </form>
  )
}
