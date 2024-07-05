import React from 'react'
import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5';

interface Props {
    isPaid: boolean;
}

export const OrderStatus = ({isPaid} : Props) => {
  return (
    <div
        className={
        clsx(
            "flex items-center rounded-lg py-2 px-3.5 text-sm font-bold text-white mb-5",
            {
            'bg-red-600': !isPaid,
            'bg-teal-600': isPaid
            }
        )
        }
    >
        <IoCardOutline size={30}/>
        <span className="mx-2">{isPaid ? 'Orden pagada' : 'Pendiente de pago'}</span>
    </div>
  )
}
