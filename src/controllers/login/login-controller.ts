import { Request, Response } from "express";
import { login } from '../../services/login/login-service'
import { LoginDto } from "../../dto/login-dto";

export async function LoginController(
    req: Request<{}, {}, LoginDto>, 
    res: Response
): Promise<void> {
    const token = await login(req.body);
    res.status(200).json({ token });
}

