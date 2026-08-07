import { Request, Response } from "express";
import { eliminarRegistroPrestamoService } from "../services/eliminar-prestamos-service";
import { validarNumero } from "../../shared/services/validar-numero-service";

export async function eliminarRegistroPrestamoController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        validarNumero(id, "id");
        const eliminarRegistro = await eliminarRegistroPrestamoService(id);
        res.status(200).json({ eliminarRegistro });    
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error
            ? error.message
            : 'No se pudo eliminar el registro de prestamo'
        });
    }
}