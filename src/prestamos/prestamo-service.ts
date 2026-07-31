import { prisma} from "../lib/prisma";
import { prestamoDto } from "./prestamo-dto";

export async function prestamoService(data: prestamoDto) {
    const { userId, nombrePrestamo, amount} = data;

    if(!nombrePrestamo || nombrePrestamo == ''){
        console.error('Nombre invalido');
    }

    if(amount == null || amount <= 0){
        console.error('Cantidad ingresada no valida');
    }

    const registroPrestamo = await prisma.prestamo.create({
        data: {
            userId,
            nombrePrestamo,
            amount,
        }
    });

    return registroPrestamo;
}