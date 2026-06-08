import { useLoaderData } from "react-router"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import type { User } from "@/types/User"
import type { Role } from "@/types/roles/Role"
import { paths } from "@/routes/paths"

type NavItem = { label: string; path: string }

// navs são estáticas por papel — moram aqui no layout, não vêm do back
const ROLE_NAVS: Record<Role, NavItem[]> = {
  student: [
    { label: "Início", path: paths.student },
    { label: "Buscar Disciplina", path: paths.studentSearch },
    { label: "Minhas Monitorias", path: paths.studentMonitorings },
    { label: "Frequência", path: paths.student },
    { label: "Fórum", path: paths.studentForum },
  ],
  monitor: [
    { label: "Início", path: paths.monitor },
    { label: "Materiais", path: paths.monitorMaterials },
    { label: "Frequência", path: paths.monitor },
    { label: "Fórum", path: paths.monitorForum },
  ],
  admin: [
    { label: "Dashboard", path: paths.admin },
    { label: "Disciplinas", path: "#" },
    { label: "Turmas", path: paths.home },
    { label: "Alunos", path: "/students" }, // TODO: rota /students ainda não existe
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
