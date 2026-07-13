import { prisma } from "../lib/prisma";
import { LoginDto } from "../dto/login-dto";
import bcrypt from "bcrypt";
import { generarToken } from "../services/generarToken-service"

async function login(data: LoginDto): Promise<string> {
    const { email, password } = data;
    const usuario = await prisma.usuario.findUnique({
        where: {
            email,
        },
    })

    if(!usuario){
        throw new Error('Usuario no encontrado')
    }

    const coincide = await bcrypt.compare(password, usuario.password);

    if(!coincide) {
        throw new Error('Contraseña incorrecta')
    }

    const payload = {
        email: usuario.email
    };
    return generarToken(payload)
}
