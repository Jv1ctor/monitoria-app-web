import { useAuth } from "@/hooks/use-auth.hook"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import type { Role } from "@/types/roles/Role"
import { paths } from "@/routes/paths"

type NavItem = { label: string; path: string }

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
    { label: "Alunos", path: "/students" },
    { label: "Monitores", path: "#" },
    { label: "Vincular", path: "#" },
  ],
}

export function Layout() {
  const { user } = useAuth()
  const firstName = user?.firstName ?? ""
  const lastName = user?.lastName ?? ""
  const registration = user?.registration ?? ""
  const role = user?.roles?.[0]?.role ?? "student"
  const navs = ROLE_NAVS[role]

  return (
    <DashboardLayout
      firstName={firstName}
      lastName={lastName}
      registration={registration}
      navs={navs}
    />
  )
}
