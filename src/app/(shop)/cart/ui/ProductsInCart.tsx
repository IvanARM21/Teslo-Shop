'use client';

import { ProductImage, QuantitySelector, Spinner } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);


    useEffect(() => {
        setLoaded(true);
    }, [])

    if(!loaded) return <Spinner className="w-[70px] my-auto mx-auto" classNameChilds="w-[20px] h-[20px]" />

    if(productsInCart.length === 0) redirect('/empty');

  return (
    <>
        {
            productsInCart.map(product => (
            <div key={`${product.id}-${product.size}`} className="flex gap-3 mb-5 ">
                <Link 
                    className=" overflow-hidden max-w-36 h-fit"
                    href={`/product/${product.slug}`}
                >
                    <ProductImage 
                        src={product.image}
                        width={150}
                        height={150}
                        alt={product.title}
                        className="mr-5 rounded w-full hover:scale-125 transition-transform duration-300"
                    />
                </Link>

                <div>
                    <Link 
                        className="hover:text-blue-600 cursor-pointer transition-colors"
                        href={`/product/${product.slug}`}
                    >{product.title} - <span className="text-lg font-medium">{product.size}</span></Link>

                    <p>${product.price}</p>

                    <QuantitySelector 
                        quantity={product.quantity}
                        onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
                    />

                    <button 
                        type="button"
                        className="underline my-3"
                        onClick={() => removeProduct(product)}
                    >Remover</button>
                </div>
            </div>
            ))
        }
    </>
  )
}
