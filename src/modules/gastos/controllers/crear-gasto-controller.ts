import { NextFunction, Request, Response } from "express";
import { registrarGastoService } from '../services/crear-gasto-service'
import { validarNumero } from "../../../shared/services/validar-numero-service";
import { crearRegistroDto } from "../../../shared/dto/crearRegistroDto";

export async function registrarGastoController(
    req: Request<{},{}, crearRegistroDto>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        validarNumero(req.body.userId, "userId");
        validarNumero(req.body.categoryId, "categoryId");
        validarNumero(req.body.amount, "amount");
        const nuevoGasto = await registrarGastoService(req.body)
        res.status(201).json({ nuevoGasto });    
    } catch (error) {
        next(error);
    }   
}