export interface EquipmentResponse {
  id: string;
  tipo_equipo_name: string;
  area_servicio_name: string;
  cliente_name: string;
  estado_display: string;

  numero_serie: string;
  estado: string;

  marca: string;
  modelo: string;

  tipo_equipo: number | null;
  area_servicio: number | null;
  cliente: number | null;
}

import { z } from "zod";

export const EquipmentSchema = z.object({
  numero_serie: z
    .string()
    .min(1, "El número de serie es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  estado: z.string().min(1, "El estado es obligatorio"),
  marca: z
    .string()
    .min(1, "La marca es obligatoria")
    .max(100, "Máximo 100 caracteres"),
  modelo: z
    .string()
    .min(1, "El modelo es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  tipo_equipo: z.string().nullable(),
  area_servicio: z.string().nullable(),
  cliente: z.string().nullable(),
});

export type EquipmentRequestType = z.infer<typeof EquipmentSchema>;
