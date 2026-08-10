import { Request, Response, NextFunction } from "express";
import { validarNumero } from "../../../shared/services/validar-numero-service";
import { listarPrestamoService } from "../services/listar-prestamo-service";

export async function listarPrestamoController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = validarNumero(req.params.id, "id");
        const registros = await listarPrestamoService(id);
        res.status(200).json({ registros });
    } catch (error) {
        next(error);
    }
}
