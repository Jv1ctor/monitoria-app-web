import { z } from "zod"

export const createTopicSchema = z.object({
  course: z.string().min(1, { message: "Selecione uma disciplina." }),
  title: z.string().min(5, { message: "O título deve ter no mínimo 5 caracteres." }),
  content: z.string().min(10, { message: "A mensagem deve ter no mínimo 10 caracteres." }),
})