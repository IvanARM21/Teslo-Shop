'use client';

import { Spinner } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if(!loaded) return <Spinner className="w-[70px] my-auto mx-auto" classNameChilds="w-[20px] h-[20px]" />

  return (
    <>
        {
            productsInCart.map(product => (
            <div key={`${product.id}-${product.size}`} className="flex gap-2 mb-5 ">
                <div className="overflow-hidden max-w-36 h-fit">
                    <Image 
                        src={`/products/${product.image}`}
                        width={150}
                        height={150}
                        alt={product.title}
                        className="mr-5 rounded w-full"
                    />
                </div>

                <div>
                    <span>{product.title} - <span className="text-lg font-medium">{product.size}</span></span>

                    <p>{currencyFormat(product.price)} x {product.quantity}</p>
                    <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
                </div>
            </div>
            ))
        }
    </>
  )
}
