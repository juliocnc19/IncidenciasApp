import { z } from "zod";
import { typeIncidents } from "../constans/typeIncidents";

const options = [
  typeIncidents[0].out,
  typeIncidents[1].out
] as const

export const incidentSchema = z.object({
  title: z.enum(options, {
    required_error: "Por favor selecciona un tipo",
    invalid_type_error: "Título inválido",
  }),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "La descripción no puede exceder 500 caracteres"),
});

