import { crearRegistroDto } from '../dto/crearRegistroDto';

export async function crearRegistro(
    model: {create(args: {
        data: Record<string, unknown>;
    }):Promise<unknown>},
    categoryField: string, 
    data: crearRegistroDto
) {
    const { userId, categoryId, amount } = data;
    return await model.create({
        data: {
            userId,
            [categoryField] : categoryId,
            amount,
        }
    })
}