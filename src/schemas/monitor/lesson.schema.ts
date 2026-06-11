import { z } from "zod";

export const createLessonSchema = z.object({
  class_id: z.coerce.number().int().positive("Selecione uma turma"),
  modality: z.enum(["REMOTE", "INPERSON"], {
    message: "Selecione a modalidade",
  }),
  date_time: z.string().min(1, "Informe a data e hora"),
  description: z.string().max(500, "Máx 500 caracteres").optional(),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
