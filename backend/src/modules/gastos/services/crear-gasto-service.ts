import { prisma } from '../../../lib/prisma'
import { crearRegistroDto } from '../../../shared/dto/crearRegistroDto';
import { validarRegistro } from '../../../shared/services/validar-registro-service';
import { crearRegistro } from '../../../shared/services/crear-registro-service';
import { validarUsuario } from '../../../shared/services/validar-usuario-service';

export async function registrarGastoService(data: crearRegistroDto) {
    const { userId, categoryId, amount } = data;

    await validarUsuario(userId);
    await validarRegistro(prisma.categoriaGasto, "id", categoryId, "Categoria no encontrada");

    const registrarGasto = await crearRegistro(prisma.gasto, "categoryId", data)

    return registrarGasto;
}