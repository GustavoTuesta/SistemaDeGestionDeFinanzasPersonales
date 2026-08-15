import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../exceptions/NotFoundError";

const prisma = new PrismaClient();

export async function validarRegistro(
    model: {
        findUnique(args: {
            where: Record<string, unknown>;
        }):Promise<unknown>;
    },
    valorBuscar: string,
    id: number,
    mensaje: string
) {
    // recibe el modelo y busca el campo ingresado en (valorBuscar) y la id, recibida.
    const existente = await model.findUnique({
        where: {
            [valorBuscar]: id,
        }
    });
    // retorna error de registro no encontrado si no encuentra la id ingresada
    if(!existente){
        throw new NotFoundError(mensaje);
    }
}