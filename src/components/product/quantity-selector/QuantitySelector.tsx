'use client';
import { useState } from "react";
import { IoAddCircle, IoAddOutline, IoRemoveCircleOutline, IoRemoveOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({quantity, onQuantityChanged} : Props) => {

    const onChangeValue = (value: number) => {
        if(quantity + value < 1) return

        onQuantityChanged(quantity+value);
    }

  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Cantidad</h3>
        <div className="flex">
            <button 
                onClick={() => onChangeValue(-1)}
                className=" bg-zinc-600 rounded-full p-1 bg-opacity-10 hover:bg-opacity-80 transition-all duration-300"
            ><IoRemoveOutline size={20} /></button>

            <span className="mx-5 w-6 text-center bg-zinc-100 rounded">
                {quantity}
            </span>

            <button
                onClick={() => onChangeValue(+1)}
                className=" bg-zinc-600 rounded-full p-1 bg-opacity-10 hover:bg-opacity-80 transition-all duration-300"
            ><IoAddOutline size={20} /></button>
        </div>
    </div>
  )
}
