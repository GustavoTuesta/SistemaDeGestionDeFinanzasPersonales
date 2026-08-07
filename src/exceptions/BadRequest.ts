import { AppError } from "./AppError";

export class BadRequest extends AppError {
    constructor(message = 'Sintaxis incorrecta'){
        super(message, 400)
    }
}