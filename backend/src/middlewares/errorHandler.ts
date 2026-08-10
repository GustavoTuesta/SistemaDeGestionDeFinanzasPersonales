import { NextFunction, Request, Response } from "express";
import { AppError } from "../exceptions/AppError";

export function errorHandler (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if(error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message
        });
    } else {
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}
