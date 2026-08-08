import { prisma} from "../../../lib/prisma";
import { validarNumero } from "../../../shared/services/validar-numero-service";
import { prestamoDto } from "../prestamos-dto";

export async function prestamoService(data: prestamoDto) {
    const { userId, nombrePrestamo, amount} = data;
    if(!nombrePrestamo || nombrePrestamo == ''){
        console.error('Nombre invalido');
    }
    validarNumero(amount, "amount")
    const registroPrestamo = await prisma.prestamo.create({
        data: {
            userId,
            nombrePrestamo,
            amount,
        }
    });
    return registroPrestamo;
}