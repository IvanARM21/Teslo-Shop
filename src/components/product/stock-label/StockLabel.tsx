'use client';

import { getStockBySlug } from "@/actions";
import { Spinner } from "@/components/ui/spinner/Spinner";
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug } : Props) => {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStock = async () => {
            const inStock = await getStockBySlug(slug);
            setStock(inStock);
            setIsLoading(false);
        }
        getStock();
    }, [slug])

    

    if(isLoading) return <Spinner className={'w-[30px]'} classNameChilds={'w-[5px] h-[5px]'} />

    return (
    <p className={`font-bold`}>
        Stock: {stock}
    </p>
  )
}
