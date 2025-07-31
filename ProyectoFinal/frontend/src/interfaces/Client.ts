import { z } from "zod";

export interface Cliente {
  type: string; // Desplegable
  typeId: string; //Desplegable
  id: string;
  firmenname: string; // Razon Social
  country: string;
  phones: string[]; // Array de teléfonos
  phNumbers: { value: string }[]; // Array de objetos con valor de teléfono
  emails: string[]; // Array de emails
  emailAddresses: { value: string }[]; // Array de objetos con valor de email
}

export const ClienteSchema = z.object({
  type: z.string().nonempty("El tipo es obligatorio"),
  typeId: z.string().nonempty("El tipoId es obligatorio"),
  identification: z
    .string()
    .nonempty("El id es obligatorio")
    .regex(/^\d+$/, "La identificación solo debe contener números"),
  firmenname: z.string().nonempty("La razón social es obligatoria"),
  country: z.string().nonempty("El país es obligatorio"),
   phNumbers: z
    .array(z.object({ value: z.string().nonempty("El teléfono no puede estar vacío") }))
    .optional(),

  emailAddresses: z
    .array(z.object({ value: z.email("Debe ser un email válido") }))
    .optional(),
});

export type ClienteType = z.infer<typeof ClienteSchema>;
