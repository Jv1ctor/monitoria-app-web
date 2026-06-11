import { z } from "zod";

const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export const createDocumentSchema = z.object({
  class_id: z.coerce.number().int().positive("Selecione uma turma"),
  file: z
    .instanceof(File, { message: "Anexe o arquivo" })
    .refine((f) => f.size <= 20 * 1024 * 1024, "Máx 20MB")
    .refine((f) => ALLOWED_MIME.includes(f.type), "Formato não suportado"),
  description: z.string().max(200, "Máx 200 caracteres").optional(),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;

export const updateDocumentSchema = z.object({
  description: z.string().max(200, "Máx 200 caracteres").optional(),
});

export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
