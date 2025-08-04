import { z } from "zod";

export interface ServiceReportResponse {
  id: number;
  mantenimiento_info: string;
  fecha_creacion: string; // formato ISO: string con date-time
  creado_por_name: string;
  estado_display: string;

  estado: string;
  contenido: string;
  fecha_emision: string | null; // puede ser null
  mantenimiento: number | null;
  creado_por: number | null;
}

export const ServiceReportSchema = z.object({
  estado: z.string().nonempty(),
  contenido: z.string().nonempty("El contenido es requerido"),
  fecha_emision: z.date().optional(),
  mantenimiento: z.string().nullable(),
  creado_por: z.string().nullable(),
});

export type ServiceReportRequest = z.infer<typeof ServiceReportSchema>