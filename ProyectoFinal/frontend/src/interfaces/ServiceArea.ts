import { z } from "zod";


export interface ServiceAreaResponse {
    id: string,
    sede_name: string,
    "equipos_count": 0,
    "name": "sdsa",
    "sede": 10
}

export const ServiceAreaSchema = z.object({
  name: z.string().min(1).max(100),
  sede: z.string().nonempty("El campo Sede es obligatorio"),
});

export type ServiceAreaType = z.infer<typeof ServiceAreaSchema>;
