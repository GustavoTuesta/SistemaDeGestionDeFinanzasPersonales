import { Request, Response } from "express";
import { login } from './login-service'
import { LoginDto } from "./login-dto";

export async function LoginController(
    req: Request<{}, {}, LoginDto>, 
    res: Response
): Promise<void> {
    const token = await login(req.body);
    res.status(200).json({ token });
}

