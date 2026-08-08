import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function actualizarRegistro<T>
(model: {
        update(args: {
                where: {
                    id: number
                },
                data: T;
            }
        ): Promise<unknown>;
    },
    id: number,
    datos: T
) {
    const registroActualizado = await model.update({
        where: {
            id,
        },
        data: datos,
    })
    return registroActualizado;
}