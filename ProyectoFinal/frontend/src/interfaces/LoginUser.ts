import {z} from "zod"

export interface LoginUser{
    username:String,
    password: String
}

export const LoginUserSchema = z.object({
    userLogin: z.string().nonempty("El usuario es obligatorio"),
    userPassword: z.string().nonempty("La contraseña es obligatoria")
});

export type LoginUserType = z.infer<typeof LoginUserSchema>;