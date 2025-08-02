export interface MaintenanceResponse {
    id: string;
    tipo: string;
    estado: string;
    equipo: string | null;
    usuario: string | null;
}

import { z } from "zod";

export const MaintenanceSchema = z.object({
    tipo: z.string().min(1, "El tipo es obligatorio"),
    estado: z.string().min(1, "El estado es obligatorio"),
    equipo: z.string().nullable(),
    usuario: z.string().nullable(),
});

export type MaintenanceRequestType = z.infer<typeof MaintenanceSchema>;
