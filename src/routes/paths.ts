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
  studentMonitorings: "/student/monitoring",
  studentMyMonitorings: "/student/my-monitoring",
  studentFrequency: "/student/frequencies",
  studentMaterials: "/student/materials",
  studentForum: "/student/forum",

  // monitor
  monitor: "/monitor",
  monitorMaterials: "/monitor/materials",
  monitorLessons: "/monitor/lessons",
  monitorSchedule: "/monitor/schedule",
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

// Frequência de uma aula específica do monitor.
export const monitorAttendance = (lessonId: number) => `/monitor/attendance/${lessonId}`
