import { Request, Response } from "express";
import { RegisterDto } from "./registro-dto";
import { RegisterService } from "./registro-service"

export async function RegisterController(
    req: Request<{},{}, RegisterDto>,
    res: Response
): Promise<void> {

    try {
        const user = await RegisterService(req.body);
        res.status(201).json({ user });    
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error
            ? error.message
            : "Error al registrar el usuario"
        })
    }
    
}

