import { z } from "zod";

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
  adress: z.string().nonempty("La direccion es obligatoria")
  /*
   phNumbers: z
    .array(z.object({ value: z.string().nonempty("El teléfono no puede estar vacío") }))
    .optional(),

  emailAddresses: z
    .array(z.object({ value: z.email("Debe ser un email válido") }))
    .optional(),*/
});

export type ClientType = z.infer<typeof ClientSchema> & { id: string };;
