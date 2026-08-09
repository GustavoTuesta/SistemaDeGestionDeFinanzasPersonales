import { BadRequest } from "../../exceptions/BadRequest";

export function validarNumero(num: unknown, nombreCampo: string) {
    const numero = Number(num);
    if(Number.isNaN(numero)){
        throw new BadRequest(`${nombreCampo} tiene que ser un número`);
    } 
    if(numero <= 0) {
        throw new BadRequest(`${nombreCampo} tiene que ser mayor a 0`);
    }
    return numero;
}