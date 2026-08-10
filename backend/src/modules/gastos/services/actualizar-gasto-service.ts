import { prisma } from "../../../lib/prisma";
import { actualizarRegistroDto } from "../../../shared/dto/actualizarRegistroDto";
import { actualizarRegistro } from "../../../shared/services/actualizar-registro-service";
import { validarRegistro } from "../../../shared/services/validar-registro-service";

export async function actualizarGastoService(id: number, datos: actualizarRegistroDto) {
    await validarRegistro(prisma.gasto, "id", id, "Registro no encontrado");
    return await actualizarRegistro(prisma.gasto, id, datos);
}