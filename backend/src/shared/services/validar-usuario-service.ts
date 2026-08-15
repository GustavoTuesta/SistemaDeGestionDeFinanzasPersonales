import { NotFoundError } from "../../exceptions/NotFoundError";
import { prisma } from "../../lib/prisma";

export async function validarUsuario(id: number) {
    // Busca la id ingresada en la tabla de usuario
    const usuarioEncontrado = await prisma.usuario.findUnique({
        where: {
            id
        }
    });
    // Retorna usuario no encontrado si no encuntra la id ingresada
    if(!usuarioEncontrado){
        throw new NotFoundError('Usuario no encontrado');
    }

    return id;
    
}