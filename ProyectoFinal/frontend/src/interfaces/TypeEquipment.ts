export interface TypeEquipmentResponse {
  id: string;
  name: string;
  especificaciones?: string | null;
  valor_unitario: string;
  equipos_count: string;
}


import { z } from "zod";

export const TypeEquipmentSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede tener más de 100 caracteres"),
  especificaciones: z.string().nullable().optional(),
  valor_unitario: z.string().nonempty("El valor unitario es obligatorio"),
});

export type TypeEquipmentRequest = z.infer<typeof TypeEquipmentSchema>;
