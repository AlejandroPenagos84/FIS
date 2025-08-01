import { z } from "zod";

export const ServiceAreaSchema = z.object({
  name: z.string().min(1).max(100),
  sede: z.number().nullable(),
});

export type ServiceAreaType = z.infer<typeof ServiceAreaSchema>;
