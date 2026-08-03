import { prisma } from '../../lib/prisma';

export async function eliminarRegistroIngresoService(id: number) {
    if(!id) {
        throw new Error('Id de registro invalida');
    }

    const registroEliminado = await prisma.ingreso.delete({
        where: {
            id,
        }
    });

    return registroEliminado;
}