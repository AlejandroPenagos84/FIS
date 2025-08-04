
import { z } from "zod";

export const QuotationSchema = z.object({
  estado: z.string().nonempty("El estado es requerido"),
  subtotal: z.string().nonempty("El subtotal es requerido"),
  impuestos: z.string().nonempty("Los impuestos son requeridos"),
  total: z.string().nonempty("El total es requerido"),
  mantenimiento: z
    .union([z.string(), z.null()])
    .nullable()
    .refine((val) => val !== undefined, {
      message: "Debe seleccionar un mantenimiento",
    }),
});

export type QuotationRequest = z.infer<typeof QuotationSchema>;
