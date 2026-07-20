import { prisma } from "../../lib/prisma";
import { DeleteDto } from "../../dto/delete-dto"

export async function DeleteUser(id: number) {
    return await prisma.usuario.delete(
        {
            where: { 
                id
            }
        }
    )
}