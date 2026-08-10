import { NextFunction, Request, Response } from "express";
import { prestamoDto } from "../dto/prestamos-dto";
import { prestamoService} from "../services/crear-prestamo-service"
import { validarNumero } from "../../../shared/services/validar-numero-service";
import { validarNombrePrestamo } from "../services/validar-nombrePrestamo-service";
import { BadRequest } from "../../../exceptions/BadRequest";

export async function prestamoController(
    req: Request<{}, {}, prestamoDto>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        validarNumero(req.body.userId, "userId");
        validarNombrePrestamo(req.body.nombrePrestamo);
        validarNumero(req.body.amount, "amount");
        const registrarPrestamo = await prestamoService(req.body);
        res.status(201).json({ registrarPrestamo });
    } catch (error) {
        next(error);
    }
}