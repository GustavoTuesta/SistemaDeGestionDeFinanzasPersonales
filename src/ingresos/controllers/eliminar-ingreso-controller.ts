import { NextFunction, Request, Response } from "express";
import { eliminarRegistroIngresoService } from "../services/eliminar-ingreso-service";
import { validarNumero } from "../../shared/services/validar-numero-service";

export async function eliminarRegistroIngresoController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id = Number(req.params.id);
        validarNumero(id, "id");
        const registroEliminado = await eliminarRegistroIngresoService(id);
        res.status(200).json({ registroEliminado });    
    } catch (error) {
        next(error);
    }
}