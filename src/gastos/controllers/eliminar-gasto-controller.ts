import { NextFunction, Request, Response} from 'express';
import { eliminarRegistroGastoService } from '../services/eliminar-gasto-service';
import { validarNumero } from '../../shared/services/validar-numero-service';

export async function eliminarRegistroGastoController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id = Number(req.params.id);
        validarNumero(id, "id");
        const eliminarGasto = await eliminarRegistroGastoService(id);
        res.status(200).json({ eliminarGasto })
    } catch (error) {
        next(error);
    }    
}