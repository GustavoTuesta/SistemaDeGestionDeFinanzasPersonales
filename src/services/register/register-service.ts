import { prisma } from "../../lib/prisma"
import { RegisterDto } from "../../dto/register-dto"
import bcrypt from "bcrypt"

export async function RegisterUser(data: RegisterDto) {
    try{
        const {name, lastname, email, password} = data;
        const saltRound = 10;
        const registrado = await prisma.usuario.findUnique(
            {
                where: {
                    email
                },
            }
        )

        if(registrado) {
            throw new Error('Este correo ya se encuentra registrado.')
        }

        if(password.length < 8){
            throw new Error('Contraseña insegura. Ingrese otra cotraseña')
        }

        const passwordHash = await bcrypt.hash(password, saltRound);

        const newUser = await prisma.usuario.create(
            {
                data: {
                    name,
                    lastname,
                    email,
                    password: passwordHash
                },
            }
        )

        const { HashPassword, ...newUserWitoutPassword} = newUser

        return newUserWitoutPassword;

    } catch (error){
        console.error(error)
        throw error
    }
}
