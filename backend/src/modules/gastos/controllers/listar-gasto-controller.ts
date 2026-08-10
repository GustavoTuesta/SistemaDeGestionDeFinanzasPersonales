import { Request, Response, NextFunction } from "express";
import { listarGastoService } from "../services/listar-gasto-service";
import { validarNumero } from "../../../shared/services/validar-numero-service";

export async function listarGastoController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = validarNumero(req.params.id, "id");
        const registros = await listarGastoService(id);
        res.status(200).json({ registros });
    } catch (error) {
        next(error);
    }
}