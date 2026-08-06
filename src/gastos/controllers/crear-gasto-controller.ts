import { Request, Response } from "express";
import { registrarGastoService } from '../services/crear-gasto-service'
import { validarNumero } from "../../shared/services/validar-id-service";
import { crearRegistroDto } from "../../shared/dto/crearRegistroDto";

export async function registrarGastoController(
    req: Request<{},{}, crearRegistroDto>,
    res: Response
): Promise<void> {
    try {
        validarNumero(req.body.userId, "userId");
        validarNumero(req.body.categoryId, "categoryId");
        validarNumero(req.body.amount, "amount");
        const nuevoGasto = await registrarGastoService(req.body)
        res.status(201).json({ nuevoGasto });    
    } catch (error) {
        console.error(
            res.status(400).json({
                message: error instanceof Error
                ? error.message
                : 'Error al registrar el gasto'
            })       
        )
    }   
}