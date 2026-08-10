import { BadRequest } from "../../../exceptions/BadRequest";

export function validarNombrePrestamo(nombrePrestamo: unknown) {
    if(nombrePrestamo !== undefined && 
            (
                typeof nombrePrestamo !== "string" ||
                nombrePrestamo.trim() == ""
            ) 
         ) {
            throw new BadRequest('nombrePrestamo no puede estar vacio');
        }
}
