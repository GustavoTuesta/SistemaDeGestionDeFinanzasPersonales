export function validarID(id: number) {
    if(Number.isNaN(id)){
        throw new Error('El id tiene que ser un numero');
    } else if(id <= 0) {
        throw new Error('El id tiene que ser mayor a 0');
    }
}