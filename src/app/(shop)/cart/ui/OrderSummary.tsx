'use client'

import { Spinner } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const OrderSummary = () => {

    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const { itemsInCart, subTotal, total, tax} = useCartStore(state => state.getSummaryInformation());

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
      if(itemsInCart === 0 && loaded === true) {
        router.replace('/empty')
      }
    }, [itemsInCart, loaded, router])

    if(!loaded) return <Spinner className="w-[70px] my-10 mx-auto" classNameChilds="w-[20px] h-[20px]" />


  return (
    <div className="grid grid-cols-2 gap-5">
        <span>Nro. Productos</span>
        <span className="text-right">{itemsInCart === 1 ? '1 artículo' :`${itemsInCart} artículos`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl font-bold">Total:</span>
        <span className="text-2xl text-right font-bold">{currencyFormat(total)}</span>
    </div>
  )
}
