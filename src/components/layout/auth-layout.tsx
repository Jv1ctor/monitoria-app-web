import { useLoaderData } from "react-router"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import type { User } from "@/types/User"
import type { Role } from "@/types/roles/Role"

type NavItem = { label: string; path: string }

// navs são estáticas por papel — moram aqui no layout, não vêm do back
const ROLE_NAVS: Record<Role, NavItem[]> = {
  student: [
    { label: "Início", path: "/student" },
    { label: "Minhas Monitorias", path: "/" },
    { label: "Frequência", path: "#" },
    { label: "Buscar Disciplina", path: "#" },
    { label: "Fórum", path: "/student/forum" },
  ],
  monitor: [
    { label: "Início", path: "/monitor" },
    { label: "Materiais", path: "#" },
    { label: "Horários", path: "#" },
    { label: "Frequência", path: "#" },
    { label: "Fórum", path: "/monitor/forum" },
  ],
  admin: [
    { label: "Dashboard", path: "/admin" },
    { label: "Disciplinas", path: "#" },
    { label: "Turmas", path: "/" },
    { label: "Alunos", path: "/students" },
    { label: "Monitores", path: "#" },
    { label: "Vincular", path: "#" },
  ],
}

export function Layout() {
  const { id } = useLoaderData() as User
  const navs = ROLE_NAVS[id.role.role]

  return (
    <DashboardLayout
      firstName={id.firstName}
      lastName={id.lastName}
      registration={id.registration}
      navs={navs}
    />
  )
}
