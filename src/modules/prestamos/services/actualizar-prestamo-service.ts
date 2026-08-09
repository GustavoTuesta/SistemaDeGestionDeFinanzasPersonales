import { prisma } from "../../../lib/prisma";
import { actualizarRegistro } from "../../../shared/services/actualizar-registro-service";
import { validarRegistro } from "../../../shared/services/validar-registro-service";
import { validarUsuario } from "../../../shared/services/validar-usuario-service";
import { actualizarPrestamoDto } from "../dto/actualizarPrestamoDto";

export async function actualizarPrestamoService(id: number, datos: actualizarPrestamoDto) {
    await validarRegistro(prisma.prestamo, "id", id, "Registro no encontrado");
    return await actualizarRegistro(prisma.prestamo, id, datos);
}