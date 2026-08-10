import { Request, Response, NextFunction } from "express";
import { validarNumero } from "../../../shared/services/validar-numero-service";
import { listarIngresoService } from "../services/listar-ingreso-service";

export async function listarIngresoController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = validarNumero(req.params.id, "id");
        const registros = await listarIngresoService(id);    
        res.status(200).json({ registros });
    } catch (error) {
        next(error);
    }
    
}