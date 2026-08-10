import { prisma } from "../../../lib/prisma";
import { listarRegistroService } from "../../../shared/services/listar-registros-service";
import { validarUsuario } from "../../../shared/services/validar-usuario-service";

export async function listarPrestamoService(id: number) {
    const usuario = await validarUsuario(id);
    return await listarRegistroService(prisma.prestamo, usuario);
}