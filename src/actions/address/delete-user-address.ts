'use server';

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
    try {
        await prisma.userAddress.delete({
            where: { userId }
        });
        return {
            ok: true,
            message: 'Se ha eliminado correctamente'
        }
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo grabar la dirección'
        }
    }
}