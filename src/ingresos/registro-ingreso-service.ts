import { prisma } from "../lib/prisma"
import { IngresosDto } from "./ingreso-dto"

export async function registrarIngresoService(data: IngresosDto) {
    const { userId, categoryIngresoId, amount } = data;

    if(categoryIngresoId == null || categoryIngresoId <=  0) {
        throw new Error('Categoria no valida');
    }

    if(amount == null || amount <= 0){
        throw new Error('Cantidad no valida');
    }

    const categoria = await prisma.categoriaIngreso.findUnique({
        where: {
            id: categoryIngresoId,
        }
    });

    if(!categoria) {
        throw new Error('Categoria no existe');
    }
    const registrarIngreso = await prisma.ingreso.create({
        data: {
            userId,
            categoryIngresoId,
            amount,
        }, 
    });

    return registrarIngreso;    
}
