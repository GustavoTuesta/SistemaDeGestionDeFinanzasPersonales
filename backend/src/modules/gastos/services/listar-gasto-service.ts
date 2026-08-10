import { prisma } from "../../../lib/prisma";
import { validarUsuario } from "../../../shared/services/validar-usuario-service";
import { listarRegistroService } from "../../../shared/services/listar-registros-service";

export async function listarGastoService(id: number) {
    const usuario = await validarUsuario(id);
    return await listarRegistroService(prisma.gasto, usuario);
}