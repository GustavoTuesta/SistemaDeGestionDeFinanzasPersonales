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
    return await model.delete({
        where: {
            id,
        }
    });
}