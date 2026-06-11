import { WelcomeAdmin } from "./WelcomeAdmin";
import { RouteErrorFallback } from "@/components/shared/RouteErrorFallback";
import { AdminSubjectsPage } from "./pages/AdminSubjectsPage";
import { AdminClassesPage } from "./pages/AdminClassesPage";
import { AdminMonitorsPage } from "./pages/AdminMonitorsPage";
import AdminStudents from "./pages/adminStudents";

export const adminRoutes = [
  {
    index: true,
    handle: { title: "Início" },
    element: <WelcomeAdmin />,
    errorElement: <RouteErrorFallback />,
  },
  // Novas rotas de admin aqui
  //EX:
  // {
  //   path: "rota (monitor)",
  //   element: <Pagina />,
  // },
  {
    path: "subjects", 
    element: <AdminSubjectsPage />,
    handle: { title: "Disciplinas" }
  },
  {
    path: "studentsClass",
    element: <AdminStudents />,
    handle: { title: "Gerenciar Turmas" },
  },
  {
    path: "classes",
    element: <AdminClassesPage />,
    handle: { title: "Turmas" }
  },
  {
    path: "monitors",
    element: <AdminMonitorsPage />,
    handle: { title: "Monitores" }
  }
]