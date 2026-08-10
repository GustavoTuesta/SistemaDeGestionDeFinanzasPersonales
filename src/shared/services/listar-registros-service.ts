import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listarRegistroService(
    model: {
        findMany(args: {
            where: {
                userId: number,
            }
        }): Promise<any>
    }    
    ,id: number
) {

    const listaRegistros = model.findMany( {
        where: {
            userId: id
        }
    })
    return listaRegistros;
}