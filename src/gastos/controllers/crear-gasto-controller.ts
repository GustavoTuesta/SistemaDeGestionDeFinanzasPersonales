import { Request, Response } from "express";
import { gastosDto } from "../gastos-dto";
import { registrarGastoService } from '../services/crear-gasto-service'

export async function registrarGastoController(
    req: Request<{},{}, gastosDto>,
    res: Response
): Promise<void> {
    try {
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