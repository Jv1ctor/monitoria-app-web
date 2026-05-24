import { z } from "zod"

export const loginSchema = z.object({
  matricula: z
    .string()
    .min(1, "A matrícula é obrigatória")
    .regex(/^\d{7}$/, "A matrícula deve conter exatamente 7 números"),
  senha: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
})

export const cadastroSchema = z.object({
  nome: z.string().min(3, "Nome completo é obrigatório"),
  matricula: z
    .string()
    .min(1, "A matrícula é obrigatória")
    .regex(/^\d{7}$/, "A matrícula deve conter 7 números"),
  curso: z.string().min(1, "Selecione um curso"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Insira um e-mail institucional válido")
    .refine((email) => email.endsWith("@edu.unifor.br") || email.endsWith("@unifor.br"), {
      message: "Utilize seu e-mail da Unifor (@edu.unifor.br)",
    }),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
})