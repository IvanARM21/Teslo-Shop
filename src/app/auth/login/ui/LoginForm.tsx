'use client';

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { authenticate } from "@/actions";
import { IoAlertCircle, IoAlertCircleOutline, IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export const LoginForm = () => {

    const router = useRouter();
    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
      if(state === 'Success') {
        router.replace('/');
      }
    }, [state, router]);

  return (
    <form action={dispatch} className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input
            className="p-2 mt-2 shadow-md bg-slate-50 rounded-md mb-5"
            placeholder="Tú Correo Electrónico"
            type="email"
            name="email"
        />

        <label htmlFor="email">Contraseña</label>
        <input
            className="p-2 mt-2 shadow-md bg-slate-50 rounded-md mb-8"
            placeholder="Tú Contraseña"
            type="password" 
            name="password"
        />

        <div
          className="flex h-2 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state === "CredentialsSignin" && (
            <div className="mb-2 flex items-center gap-2">
              <IoAlertCircle className="h-6 w-6 text-red-500" />
              <p className="text-sm text-red-500">Verique las credenciales</p>
            </div>
          )}
        </div>

        
        <LoginButton />

        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"/>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"/>
        </div>

        <Link
            href="/auth/new-account" 
            className="btn-secondary text-center"
        >Crear una nueva cuenta</Link>

    </form>
  )
}


function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx({
                "btn-primary": !pending,
                "btn-disabled": pending
            })}
            disabled={pending}
            
        >Ingresar</button>
    )
}