import { NextFunction, Request, Response } from "express";
import { actualizarIngresoService } from "../services/actualizar-ingreso-service";
import { validarNumero } from "../../../shared/services/validar-numero-service";

export async function actualizarIngresoController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = validarNumero(req.params.id, "id");
        if(req.body.categoryId !== undefined) {
            validarNumero(req.body.categoryId, "categoryId");
        }
        if(req.body.amount !== undefined) {
            validarNumero(req.body.amount, "amount")
        }
        const datos = req.body;
        const registroActualizado = await actualizarIngresoService(id, datos)
        res.status(201).json({ registroActualizado });
    } catch (error) {
        next(error);
    }
}