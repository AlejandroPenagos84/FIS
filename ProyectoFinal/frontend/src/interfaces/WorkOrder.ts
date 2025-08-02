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
    estado: z.string(),
    fecha_asignacion: z.date().optional(),
    descripcion_trabajo: z.string(),
    mantenimiento: z.string().nullable(),
    usuario_asignado: z.string().nullable(),
});

export type WorkOrderRequestType = z.infer<typeof WorkOrderSchema>;
