'use server';

import { Category, Product } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ProductImage, Size } from "@prisma/client";

export const getProductBySlug = async (slug: string) : Promise<Product | null> => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                productImage: true
            },
            where: {
                slug: slug
            }
        });

        if(!product) return null

        return {
            ...product,
            images: product.productImage.map(image => image.url)
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener el producto por slug');
    }

}