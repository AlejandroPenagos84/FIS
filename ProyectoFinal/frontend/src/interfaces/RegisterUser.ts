import {z} from "zod"

export interface RegisterUser {
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  username: string;
  password: string;
  role: string;
}

export const RegisterUserSchema = z.object({
  firstName: z.string().nonempty("El primer nombre es obligatorio"),
  secondName: z.string().optional(), // opcional si aplica
  firstLastName: z.string().nonempty("El primer apellido es obligatorio"),
  secondLastName: z.string().optional(), // opcional si aplica
  username: z.string().nonempty("El nombre de usuario es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.string().nonempty("El rol es obligatorio"),
});


export type RegisterUserType = z.infer<typeof RegisterUserSchema>;