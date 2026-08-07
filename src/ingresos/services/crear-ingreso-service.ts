import { prisma } from "../../lib/prisma"
import { crearRegistroDto } from "../../shared/dto/crearRegistroDto";
import { crearRegistro } from "../../shared/services/crear-registro-service";
import { validarRegistro } from "../../shared/services/validar-registro-service";

export async function registrarIngresoService(data: crearRegistroDto) {
    const { userId, categoryId} = data;

    await validarRegistro(prisma.usuario, "id", userId, "Usuario no encontrado");
    await validarRegistro(prisma.categoriaIngreso, "id", categoryId, "Categoria no encontrada");
    
    const registrarIngreso = await crearRegistro(prisma.ingreso, "categoryIngresoId", data)

    return registrarIngreso;    
}
