import type { NavItem } from "@/components/layout/auth-layout";
import { paths } from "@/routes/paths";
import AdminStudents from "./pages/AdminStudents";
import { WelcomeAdmin } from "./WelcomeAdmin";

export const adminNavs: NavItem[] = [
  { label: "Dashboard", path: paths.admin },
  { label: "Turmas", path: paths.adminClassroom },
];

export const adminRoutes = [
  { index: true, handle: { title: "Início" }, element: <WelcomeAdmin /> },
  // Novas rotas de admin aqui
  //EX:
  // {
  //   path: "rota (monitor)",
  //   element: <Pagina />,
  // },
  {
    path: "classroom",
    element: <AdminStudents />,
    handle: { title: "Gerenciar Turmas" },
  }
]