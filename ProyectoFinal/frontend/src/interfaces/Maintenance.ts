export interface MaintenanceResponse {
    id: string;
    equipo_info: string | null; // Updated to string to match the serializer output
    tipo: string;
    estado: string;
    equipo: string | null;
    usuario: string | null;
}

import { z } from "zod";

export const MaintenanceSchema = z.object({
    tipo: z.string().min(1, "El tipo es obligatorio"),
    estado: z.string().min(1, "El estado es obligatorio"),
    equipo: z.union([z.string(), z.number()]).nullable(),
    usuario: z.union([z.string(), z.number()]).nullable(),
});

export type MaintenanceRequestType = z.infer<typeof MaintenanceSchema>;