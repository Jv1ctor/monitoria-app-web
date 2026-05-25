import { z } from "zod"

export const loginSchema = z.object({
  enrollment: z
    .string()
    .min(1, "A matrícula é obrigatória")
    .regex(/^\d{7}$/, "A matrícula deve conter exatamente 7 números"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
})

export const registerSchema = z.object({
  name: z.string().min(3, "Nome completo é obrigatório"),
  enrollment: z
    .string()
    .min(1, "A matrícula é obrigatória")
    .regex(/^\d{7}$/, "A matrícula deve conter 7 números"),
  course: z.string().min(1, "Selecione um curso"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Insira um e-mail institucional válido")
    .refine((email) => email.endsWith("@edu.unifor.br") || email.endsWith("@unifor.br"), {
      message: "Utilize seu e-mail da Unifor (@edu.unifor.br)",
    }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

export const recoverPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Insira um e-mail institucional válido")
    .refine((email) => email.endsWith("@edu.unifor.br") || email.endsWith("@unifor.br"), {
      message: "Utilize seu e-mail da Unifor (@edu.unifor.br)",
    }),
})