import { PrismaClient } from "@prisma/client";
import { validarRegistro } from "./validar-registro-service";

const prisma = new PrismaClient();

export async function eliminarRegistro(
    model: {
        delete(args: {
            where: {
                 id:number 
                }
            }): Promise<any>
    },
    id: number
) {
    const registroEliminado = await model.delete({
        where: {
            id,
        }
    });

    return registroEliminado;
}