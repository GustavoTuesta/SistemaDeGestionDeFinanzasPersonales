import { Request, Response, NextFunction } from "express";
import { actualizarPrestamoService } from "../services/actualizar-prestamo-service";
import { validarNumero } from "../../../shared/services/validar-numero-service";
import { validarNombrePrestamo } from "../services/validar-nombrePrestamo-service";

export async function actualizarPrestamoController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = validarNumero(req.params.id, "id")
        validarNombrePrestamo(req.body.nombrePrestamo);
        if(req.body.amount !== undefined){
            validarNumero(req.body.amount, "amount");
        }
        const datos = req.body;
        const registroActualizado = await actualizarPrestamoService(id, datos);
        res.status(200).json({ registroActualizado });
    } catch (error) {
        next(error);
    }
}