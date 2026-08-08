import { BadRequest } from "../../exceptions/BadRequest";

export function validarNumero(numero: number, nombreCampo: string) {
    if(Number.isNaN(numero)){
        throw new BadRequest(`${nombreCampo} tiene que ser un número`);
    } else if(numero <= 0) {
        throw new BadRequest(`${nombreCampo} tiene que ser mayor a 0`);
    }
    return numero;
}