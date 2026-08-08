import { NextFunction, Request, Response } from "express";
import { registrarIngresoService } from "../services/crear-ingreso-service";
import { crearRegistroDto } from "../../../shared/dto/crearRegistroDto";
import { validarNumero } from "../../../shared/services/validar-numero-service";

export async function registrarIngresoController(
    req: Request<{}, {}, crearRegistroDto>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        validarNumero(Number(req.body.userId), "userId");
        validarNumero(Number(req.body.categoryId), "categoryId");
        validarNumero(Number(req.body.amount), "amount");
        const registro = await registrarIngresoService(req.body)
        res.status(201).json({ registro });    
    } catch (error) {
        next(error);
    }
}