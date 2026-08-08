import { prisma } from '../../../lib/prisma';
import { eliminarRegistro } from '../../../shared/services/eliminar-registro-service';
import { validarRegistro } from '../../../shared/services/validar-registro-service';

export async function eliminarRegistroIngresoService(id: number) {
    await validarRegistro(prisma.ingreso, "id", id, "ID no encontrado");
    return await eliminarRegistro(prisma.ingreso, id);
}