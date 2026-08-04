import { prisma } from '../../lib/prisma'
import { gastosDto } from "../gastos-dto";

export async function registrarGastoService(data: gastosDto) {
    const { userId, categoryGastoId, amount } = data;

    if(categoryGastoId == null || categoryGastoId <= 0){
        return new Error('Categoria no valida')
    }

    if(amount == null || amount <= 0){
        return new Error('Cantidad ingresada no valida')
    }

    const categoria = await prisma.categoriaGasto.findUnique({
        where: {
            id: categoryGastoId,
        }
    });

    if(!categoria) {
        return new Error('Categoria no encontrada');
    }

    const registrarGasto = await prisma.gasto.create({
        data: {
            userId,
            categoryGastoId,
            amount,
        }
    });

    return registrarGasto;
}