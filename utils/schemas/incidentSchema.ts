import { z } from "zod";
import { typeIncidents } from "../constans/typeIncidents";

const incidentTypes = Object.values(typeIncidents).map(type => type.out);

export const incidentSchema = z.object({
  title: z.enum(incidentTypes as [string, ...string[]], {
    required_error: "Por favor selecciona un tipo",
    invalid_type_error: "Título inválido",
  }),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "La descripción no puede exceder 500 caracteres"),
});

