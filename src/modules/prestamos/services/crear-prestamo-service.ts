import { prisma} from "../../../lib/prisma";
import { validarUsuario } from "../../../shared/services/validar-usuario-service";
import { prestamoDto } from "../dto/prestamos-dto";

export async function prestamoService(data: prestamoDto) {
    const { userId, nombrePrestamo, amount} = data;
    await validarUsuario(userId);
    const registroPrestamo = await prisma.prestamo.create({
        data: {
            userId,
            nombrePrestamo,
            amount,
        }
    });
    return registroPrestamo;
}