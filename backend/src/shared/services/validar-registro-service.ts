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
    const existente = await model.findUnique({
        where: {
            [valorBuscar]: id,
        }
    });

    if(!existente){
        throw new NotFoundError(mensaje);
    }
}