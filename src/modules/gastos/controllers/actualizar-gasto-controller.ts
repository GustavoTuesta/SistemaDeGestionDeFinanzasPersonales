import { Request, Response, NextFunction } from "express";
import { validarNumero } from "../../../shared/services/validar-numero-service";
import { actualizarGastoService } from "../services/actualizar-gasto-service";

export async function actualizarGastoController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id = validarNumero(req.params.id, "id");
        if(req.body.categoryId !== undefined) {
            validarNumero(req.body.categoryId, "categoryId");
        }
        if(req.body.amount !== undefined) {
            validarNumero(req.body.amount, "amount");
        }
        const datos = req.body;
        const registroActualizado = await actualizarGastoService(id, datos);
        res.status(200).json({ registroActualizado });    
    } catch (error) {
        next(error);
    }
}