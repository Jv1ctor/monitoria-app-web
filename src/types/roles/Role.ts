export type Role = "student" | "monitor" | "admin"

// Papéis como o backend envia (ex.: claim `role` do JWT, resposta de /user/me).
export type ApiRole = "STUDENT" | "MONITOR" | "ADMIN"
