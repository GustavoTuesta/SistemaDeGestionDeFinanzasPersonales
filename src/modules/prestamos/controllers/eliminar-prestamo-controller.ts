import { NextFunction, Request, Response } from "express";
import { eliminarRegistroPrestamoService } from "../services/eliminar-prestamos-service";
import { validarNumero } from "../../../shared/services/validar-numero-service";

export async function eliminarRegistroPrestamoController(req: Request, res: Response, next: NextFunction) {
    try {
        const id = validarNumero(Number(req.params.id), "id");
        const eliminarRegistro = await eliminarRegistroPrestamoService(id);
        res.status(200).json({ eliminarRegistro });    
    } catch (error) {
        next(error);
    }
}