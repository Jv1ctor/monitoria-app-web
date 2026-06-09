import type { Role } from "@/types/roles/Role"

// Fonte única dos caminhos de navegação (Link / NavLink / navigate / navs).
// As definições de rota continuam em router.tsx e nos routes.tsx de cada papel.
export const paths = {
  // públicas
  home: "/",
  login: "/login",
  register: "/register",
  recover: "/recover",
  designSystem: "/ds",

  // aluno
  student: "/student",
  studentSearch: "/student/availableMonitorings",
  studentMonitorings: "/student/specificMonitoring",
  studentFrequency: "/student/frequencies",
  studentMaterials: "/student/materials",
  studentForum: "/student/forum",

  // monitor
  monitor: "/monitor",
  monitorMaterials: "/monitor/materials",
  monitorSearch: "/monitor/availableMonitorings",
  monitorForum: "/monitor/forum",

  // admin
  admin: "/admin",
}

// O fórum é compartilhado entre os papéis; resolve o caminho pelo papel atual.
export const forumByRole: Record<Role, string> = {
  student: paths.studentForum,
  monitor: paths.monitorForum,
  admin: "/admin/forum",
}

// Conteúdos de uma monitoria específica (ex.: "Ver detalhes" / "Ver conteúdo").
export const studentMaterial = (id: string | number) => `${paths.studentMaterials}/${id}`
