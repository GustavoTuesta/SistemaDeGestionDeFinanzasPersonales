import { Request, Response } from "express";
import { prestamoDto } from "../prestamos-dto";
import { prestamoService} from "../services/crear-prestamo-service"

export async function prestamoController(
    req: Request<{}, {}, prestamoDto>,
    res: Response
): Promise<void> {
    try {
        const registrarPrestamo = await prestamoService(req.body);
        res.status(201).json({ registrarPrestamo })    
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error
            ? error.message
            : 'No se pudo registrar el prestamo'
        })
    }
}