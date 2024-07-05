"use server";

import prisma from "@/lib/prisma";

export const getOrderSimilars = async (arg: string) => {
    const [firstNamePart, lastNamePart] = arg.split(' ');
    const orders = await prisma.order.findMany({
        where: {
            OrderAddress: {
                firstName: {
                    contains: firstNamePart,
                    mode: 'insensitive'
                },
                lastName: {
                    contains: lastNamePart,
                    mode: 'insensitive'
                }
            }
        }
    });

    console.log(orders)

    return orders;
}