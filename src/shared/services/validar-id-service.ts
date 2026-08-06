export function validarNumero(numero: number, nombreCampo: string) {
    if(Number.isNaN(numero)){
        throw new Error(`${nombreCampo} tiene que ser un número`);
    } else if(numero <= 0) {
        throw new Error(`${nombreCampo} tiene que ser mayor a 0`);
    }
}