import { Request, Response } from "express";
import { registrarIngresoService } from "../../services/ingresos/registro-ingreso-service";
import { IngresosDto } from "../../dto/ingreso-dto";

export async function registrarIngresoController(
    req: Request<{}, {}, IngresosDto>,
    res: Response
): Promise<void> {
    try {
        const registro = await registrarIngresoService(req.body);
        res.status(201).json({ registro });    
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error
            ? error.message
            : "Error al registrar el ingreso"
        })
    }
}