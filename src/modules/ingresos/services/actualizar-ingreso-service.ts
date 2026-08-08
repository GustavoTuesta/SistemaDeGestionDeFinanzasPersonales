import { prisma } from "../../../lib/prisma";
import { actualizarRegistroDto } from "../../../shared/dto/actualizarRegistroDto"; 
import { actualizarRegistro } from "../../../shared/services/actualizar-registro-service";
import { validarUsuario } from "../../../shared/services/validar-usuario-service";

export async function actualizarIngresoService(id:number, datos: actualizarRegistroDto) {
    const usuario = await validarUsuario(id);
    const registroActualizado = await actualizarRegistro(prisma.ingreso, usuario, datos)
    return registroActualizado;
}