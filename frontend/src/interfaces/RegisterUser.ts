import { z } from "zod";

export interface RegisterUser {
  identification: string;
  firstName: string;
  firstLastName: string;
  username: string;
  password: string;
  role: string;
}

export const RegisterUserSchema = (isUpdate: boolean) =>
  z.object({
    identification: z
      .string()
      .nonempty("La identificación es obligatoria")
      .regex(/^\d+$/, "La identificación solo debe contener números"),
    first_name: z.string().nonempty("El primer nombre es obligatorio"),
    last_name: z.string().nonempty("El primer apellido es obligatorio"),
    username: z.string().nonempty("El nombre de usuario es obligatorio"),
    password: isUpdate
      ? z.string().optional()
      : z.string().min(6, "Mínimo 6 caracteres"),
    role: z.string().nonempty("El rol es obligatorio"),
    phone: z.string().nonempty("El telofono es obligatorio"),
    email: z.string().nonempty("El email es obligatorio")
  });

// Creamos un tipo más general que cubre ambas posibilidades
export type RegisterUserType = z.infer<ReturnType<typeof RegisterUserSchema>>;
