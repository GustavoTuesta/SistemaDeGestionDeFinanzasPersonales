import { prisma } from '../../lib/prisma'

export async function eliminarRegistroGastoService(id: number) {

    if(!id) {
        throw new Error('Id invalida');
    }
    
    const eliminarGasto = await prisma.gasto.delete({
        where: {
            id,
        }
    });

    return eliminarGasto;
}