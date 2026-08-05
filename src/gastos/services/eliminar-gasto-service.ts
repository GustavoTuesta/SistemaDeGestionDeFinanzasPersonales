import { prisma } from '../../lib/prisma'
import { eliminarRegistro } from '../../shared/services/eliminar-registro-service';
import { validarRegistro } from '../../shared/services/validar-registro-service'

export async function eliminarRegistroGastoService(id: number) {
    await validarRegistro(prisma.gasto, id);
    return await eliminarRegistro(prisma.gasto, id);
}