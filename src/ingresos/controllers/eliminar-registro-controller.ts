import { Request, Response } from "express";
import { eliminarRegistroIngresoService } from "../services/eliminar-registro-service";

export async function eliminarRegistroIngresoController(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const id = Number(req.params.id);
        const registroEliminado = await eliminarRegistroIngresoService(id);
        res.status(200).json({ registroEliminado });    
    } catch (error) {
        console.error({
            message: error instanceof Error
            ? error.message
            : 'No se pudo borrar el registro de ingreso'
        })   
    }
}