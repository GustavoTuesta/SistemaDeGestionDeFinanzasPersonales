import { Request, Response } from "express";
import { registrarIngresoService } from "../services/crear-ingreso-service";
import { crearRegistroDto } from "../../shared/dto/crearRegistroDto";
import { validarNumero } from "../../shared/services/validar-id-service";

export async function registrarIngresoController(
    req: Request<{}, {}, crearRegistroDto>,
    res: Response
): Promise<void> {
    try {
        validarNumero(req.body.userId, "userId");
        validarNumero(req.body.categoryId, "categoryId");
        validarNumero(req.body.amount, "amount");
        const registro = await registrarIngresoService(req.body)
        res.status(201).json({ registro });    
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error
            ? error.message
            : "Error al registrar el ingreso"
        })
    }
}