import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function validarRegistro(
    model: {
        findUnique(args: {
            where: {
                id: number,
            }
        }):Promise<any>;
    },
    id: number
) {
    const existente = await model.findUnique({
        where: {
            id,
        }
    });

    if(!existente){
        throw new Error('El registro no existe');
    }
}