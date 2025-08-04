export interface WorkOrderResponse {
    id: number;
    mantenimiento_info: {
        id: number;
        tipo: string;
        eqipo: string;
    };      
    estado: string;
    fecha_asignacion: Date | null;
    descripcion_trabajo: string | null;
    mantenimiento: number | null;
    usuario_asignado: number | null;
}

import { z } from "zod";

export const WorkOrderSchema = z.object({
    estado: z.string().min(1, "El estado es obligatorio"),
    fecha_asignacion: z.date().optional(),
    descripcion_trabajo: z.string().min(1, "La descripción del trabajo es obligatoria"),
    mantenimiento: z.union([z.string(), z.number()]).nullable().optional(),
    usuario_asignado: z.union([z.string(), z.number()]).nullable(),
});

export type WorkOrderRequestType = z.infer<typeof WorkOrderSchema>;