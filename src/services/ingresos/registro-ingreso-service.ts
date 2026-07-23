import { prisma } from "../../lib/prisma"
import { IngresosDto } from "../../dto/ingreso-dto"

export async function registrarIngresoService(data: IngresosDto) {
    const { userId, categoryId, amount } = data;

    if(categoryId == null || categoryId <=  0) {
        throw new Error('Categoria no valida');
    }

    if(amount == null || amount <= 0){
        throw new Error('Cantidad no valida');
    }

    const categoria = await prisma.categoria.findUnique({
        where: {
            id: categoryId,
        }
    });

    if(!categoria) {
        throw new Error('Categoria no existe');
    }
    const registrarIngreso = await prisma.ingreso.create({
        data: {
            userId,
            categoryId,
            amount,
        }, 
    });

    return registrarIngreso;    
}
