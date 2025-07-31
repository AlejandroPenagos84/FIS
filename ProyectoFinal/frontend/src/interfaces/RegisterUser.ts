import { z } from "zod";

export interface RegisterUser {
  identification: string;
  firstName: string;
  firstLastName: string;
  username: string;
  password: string;
  role: string;
}

export const RegisterUserSchema = z.object({
  identification: z
    .string()
    .nonempty("La identificación es obligatoria")
    .regex(/^\d+$/, "La identificación solo debe contener números"),
  firstName: z.string().nonempty("El primer nombre es obligatorio"),
  firstLastName: z.string().nonempty("El primer apellido es obligatorio"),
  username: z.string().nonempty("El nombre de usuario es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.string().nonempty("El rol es obligatorio"),
});

type RegisterUserInput = Omit<RegisterUser, "identification"> & {
  identification: string;
};

// Tipo para el resultado validado (transformado)
export type RegisterUserType = RegisterUserInput;
