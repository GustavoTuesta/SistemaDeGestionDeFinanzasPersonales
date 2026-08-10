import { prisma } from "../../../lib/prisma"
import { crearRegistroDto } from "../../../shared/dto/crearRegistroDto";
import { crearRegistro } from "../../../shared/services/crear-registro-service";
import { validarRegistro } from "../../../shared/services/validar-registro-service";
import { validarUsuario } from "../../../shared/services/validar-usuario-service";

export async function registrarIngresoService(data: crearRegistroDto) {
    const { userId, categoryId} = data;
    await validarUsuario(userId)
    await validarRegistro(prisma.categoriaIngreso, "id", categoryId, "Categoria no encontrada");
    const registrarIngreso = await crearRegistro(prisma.ingreso, "categoryId", data)
    return registrarIngreso;    
}
