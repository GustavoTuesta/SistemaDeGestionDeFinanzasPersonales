import { prisma } from '../../lib/prisma'
import { crearRegistroDto } from '../../shared/dto/crearRegistroDto';
import { validarRegistro } from '../../shared/services/validar-registro-service';
import { crearRegistro } from '../../shared/services/crear-registro-service';

export async function registrarGastoService(data: crearRegistroDto) {
    const { userId, categoryId, amount } = data;

    await validarRegistro(prisma.usuario, "id", userId, "El usuario no existe");
    await validarRegistro(prisma.categoriaGasto, "id", categoryId, "La categoria no existe");

    const registrarGasto = await crearRegistro(prisma.gasto, "categoryGastoId", data)

    return registrarGasto;
}