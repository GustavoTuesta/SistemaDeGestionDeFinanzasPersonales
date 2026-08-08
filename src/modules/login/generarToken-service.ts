import jwt from "jsonwebtoken";

interface TokenPayload {
    email:string;
}

export function generarToken(payload: TokenPayload):string {
    return jwt.sign(payload, process.env.JWT_SECRET!);
}