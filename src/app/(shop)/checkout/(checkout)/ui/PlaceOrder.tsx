'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAddressStore, useCartStore } from "@/store";
import { placeOrder } from "@/actions";
import { currencyFormat } from "@/utils";
import {  Spinner } from "@/components";
import clsx from "clsx";
import { useRouter } from "next/navigation";


export const PlaceOrder = () => {
    
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore(state => state.address);
  const { itemsInCart, subTotal, total, tax} = useCartStore(state => state.getSummaryInformation());
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, [router]);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    // await sleep(2);
    const productsToOrder = cart.map(product => ({
        productId: product.id,
        quantity: product.quantity,
        size: product.size
    }));

    // TODO: Server Action
    const resp = await placeOrder(productsToOrder, address);
    if(!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return
    }

    //* Todo salio bien !!
    clearCart();
    router.replace('/orders/' + resp.order?.id);
  }

  if(!loaded) return <Spinner className="w-[70px] my-auto mx-auto" classNameChilds="w-[20px] h-[20px]" />

  return (
    <div className="bg-white rounded-xl shadow py-7 px-5 h-fit top-16  sticky">

            <h2 className={`text-2xl mb-2 font-bold`}>Dirección de Entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{address.firstName} {address.lastName}</p>
              <p>{address.address}</p>
              <p>{address.address2}</p>
              <p>{address.postalCode}</p>
              <p>{address.city}, {address.country}</p>
              <p>{address.phone}</p>
            </div>
            
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>


            <h2 className={`text-2xl mb-2 font-bold`}>Resumen de orden</h2>

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

            <p className="my-3 px-2">
              Al hacer clic en &quot;Colocar Orden&quot;, aceptas nuestros {' '}
              <Link
                href="#"
                className="underline"
              >términos y condiciones</Link> 
              {' '} y {' '}
              <Link
                href="#"
                className="underline"
              >política de privacidad</Link> 
            </p>

            <p className="text-red-500 text-center">{errorMessage}</p>

            <button
            // href="/orders/123"
                onClick={onPlaceOrder}
                className={
                    `${
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-disabled': isPlacingOrder
                        })
                    } "flex  justify-center w-full mt-5 mb-2"`
                }
            >Colocar Orden</button>
          </div>
  )
}
