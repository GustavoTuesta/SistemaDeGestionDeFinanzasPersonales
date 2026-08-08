import { NotFoundError } from "../../exceptions/NotFoundError";
import { prisma } from "../../lib/prisma";

export async function validarUsuario(id: number) {

    const usuarioEncontrado = await prisma.usuario.findUnique({
        where: {
            id
        }
    });

    if(!usuarioEncontrado){
        throw new NotFoundError('Usuario no encontrado');
    }

    return id;
    
}