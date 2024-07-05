"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds : ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    // Verify user session
    if(!userId) {
        return {
            ok: false,
            message: 'No hay sessión de usuario'
        }
    }

    // Get information of the products
    // Note: remember that we can carry two or more products with the same id.
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    });

    // Calculate the amounts // Header
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
 
    // The totals of tax, subtotal and totals
    const { subTotal, tax, total } = productIds.reduce((totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId);

        if(!product) throw new Error(`${item.productId} no existe`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
    }, { subTotal: 0, tax: 0, total: 0});
    
    // Create the transaction of database

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            // 1. Update the stock of the products
            const updatedProductsPromises = products.map( (product) => {
                // Acc the values
                const productQuantity = productIds
                    .filter(p => p.productId === product.id)
                    .reduce((acc, item) => item.quantity + acc, 0);
    
                if(productQuantity === 0) {
                    throw new Error(`${product.id}, no tiene cantidad definida`);
                }
    
                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        // inStock: product.inStock - productQuantity // No hacer
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            });
    
            const updatedProducts = await Promise.all(updatedProductsPromises);
    
            // Verify negative values in the existencia, not has stock
            updatedProducts.forEach(product => {
                if(product.inStock < 0) {
                    throw new Error(`${product.title} no tiene inventario suficiente`);
                }
            });
    
            // 2. Create the Order - Header - Details
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
    
                    OrderItem: {
                        createMany: {
                            data: productIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            });
    
            // Validate, if the price is 0, then, throw a error
    
            // 3. Create the address of the order
            // Address
            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName: address.firstName,
                    lastName: address.lastName,
                    city: address.city,
                    address: address.address,
                    address2: address.address2,
                    countryId: address.country,
                    postalCode: address.postalCode,
                    phone: address.phone,
                    orderId: order.id
                }
            });
    
            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx
        }
    } catch (error : any) {
        return {
            ok: false,
            message: error.message
        }
    }

    

}