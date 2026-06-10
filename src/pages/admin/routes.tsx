import AdminClassroom from "./AdminClassroom";
import { WelcomeAdmin } from "./WelcomeAdmin";
import { AdminClassesPage } from "./pages/AdminClassesPage";

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
    element: <AdminClassroom />,
    handle: { title: "Gerenciar Turmas" },
    
  },
  {
    path: "classes",
    element: <AdminClassesPage />,
    handle: { title: "Turmas" }
  }
]