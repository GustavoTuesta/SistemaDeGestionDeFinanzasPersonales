import { Request, Response} from 'express';
import { eliminarRegistroGastoService } from '../services/eliminar-gasto-service';
import { validarID } from '../../shared/services/validar-id-service';

export async function eliminarRegistroGastoController(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const id = Number(req.params.id);
        validarID(id);
        const eliminarGasto = await eliminarRegistroGastoService(id);
        res.status(200).json({ eliminarGasto })
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error
            ? error.message
            : 'No se pudo eliminar el registro de gasto'
        });
    }    
}