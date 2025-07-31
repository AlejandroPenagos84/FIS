import { z } from "zod";

export interface Client{
  type: string,
  identification: string,
  name: string,
  country: string,
  phone: string,
  email: string,
  address: string,
  siteId: number
}

export interface ClientResponse {
  id: number; // readOnly
  sede_name: string; // readOnly
  type: string; // enum: e.g., "NIT", "Cédula"
  identification?: string | null; // nullable, maxLength: 20
  name: string; // required, maxLength: 100
  email: string; // required, email format, maxLength: 254
  phone?: string | null; // nullable, maxLength: 15
  address?: string | null; // nullable
  country?: string | null; // no estaba en el schema pero sí en tu form
  sede?: number | null; // nullable, backend lo llama "sede"
}


export const ClientSchema = z.object({
  type: z.string().nonempty("El tipo es obligatorio"),
  identification: z
    .string()
    .nonempty("El id es obligatorio")
    .regex(/^\d+$/, "La identificación solo debe contener números"),
  name: z.string().nonempty("La razón social es obligatoria"),
  country: z.string().nonempty("El país es obligatorio"),
  phone: z.string().nonempty("El telefono es obligatorio"),
  email: z.string().nonempty("El email es obligatorio"),
  address: z.string().nonempty("La direccion es obligatoria"),
  siteId: z.string().nonempty("Debe seleccionar una sede")
  /*
   phNumbers: z
    .array(z.object({ value: z.string().nonempty("El teléfono no puede estar vacío") }))
    .optional(),

  emailAddresses: z
    .array(z.object({ value: z.email("Debe ser un email válido") }))
    .optional(),*/
});

export type ClientType = z.infer<typeof ClientSchema> & { id?: string };

export function mapClientResponseToClientType(response: ClientResponse): ClientType {
  return {
    id: response.id.toString(), // lo convertimos a string porque ClientType usa `id?: string`
    name: response.name,
    email: response.email,
    phone: response.phone ?? "",
    address: response.address ?? "",
    country: response.country ?? "",
    identification: response.identification ?? "",
    type: response.type,
    siteId: response.sede?.toString() ?? "", // convertir sede (number) a siteId (string)
  };
}