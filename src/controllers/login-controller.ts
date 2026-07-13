import { Request, Response } from "express";
import { LoginService } from '../services/login-service'
import { LoginDto } from "../dto/login-dto";

export async function login(
    req: Request<{}, {}, LoginDto>, 
    res: Response
): Promise<void> {
    const token = await LoginService.login(req.body);
    res.status(200).json({ token });
}

