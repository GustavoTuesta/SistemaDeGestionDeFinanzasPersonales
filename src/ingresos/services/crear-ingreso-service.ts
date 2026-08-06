import { prisma } from "../../lib/prisma"
import { crearRegistroDto } from "../../shared/dto/crearRegistroDto";
import { crearRegistro } from "../../shared/services/crear-registro-service";
import { validarRegistro } from "../../shared/services/validar-registro-service";

export async function registrarIngresoService(data: crearRegistroDto) {
    const { userId, categoryId} = data;

    await validarRegistro(prisma.usuario, "id", userId, "El usuario no existe");
    await validarRegistro(prisma.categoriaIngreso, "id", categoryId, "La categoria no existe");
    
    const registrarIngreso = await crearRegistro(prisma.ingreso, "categoryIngresoId", data)

    return registrarIngreso;    
}
