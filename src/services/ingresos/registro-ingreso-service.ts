import { prisma } from "../../lib/prisma"
import { IngresosDto } from "../../dto/ingreso-dto"

export async function registrarIngresoService(data: IngresosDto) {
    const { category, amount } = data;

    if(category == null || category <=  0) {
        throw new Error('Categoria no valida');
    }

    if(amount == null || amount <= 0){
        throw new Error('Cantidad no valida');
    }

    const categoria = await prisma.categoria.findUnique({
        where: {
            id: category,
        }
    });

    if(!categoria) {
        throw new Error('Categoria no existe');
    }
    const registrarIngreso = await prisma.ingreso.create({
        data: {
            categoryId: category,
            amount,
        }, 
    });

    return registrarIngreso;    
}
