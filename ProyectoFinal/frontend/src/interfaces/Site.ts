import { z } from "zod";

export interface SiteTypeResponse {
  id?: string;
  name: string;
  address: string;
  clients_count?: number;
  cliente?: string;
}

export const SiteSchema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  address: z.string().nonempty("La dirección es obligatoria")
});

export type SiteType = z.infer<typeof SiteSchema>  & { id?: string ,clients_count?:number, cliente?: string };    ;
