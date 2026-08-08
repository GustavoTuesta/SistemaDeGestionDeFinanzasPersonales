import { NextFunction, Request, Response } from "express";
import { actualizarIngresoService } from "../services/actualizar-ingreso-service";

export async function actualizarIngresoController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const datos = req.body;
        const registroActualizado = await actualizarIngresoService(Number(req.params.id), datos)
        res.status(201).json({ registroActualizado });
    } catch (error) {
        next(error);
    }
}