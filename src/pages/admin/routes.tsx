import AdminClassroom from "./AdminClassroom";
import { WelcomeAdmin } from "./WelcomeAdmin";
import { AdminMonitorsPage } from "./pages/AdminMonitorsPage";

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
    path: "monitors",
    element: <AdminMonitorsPage />,
    handle: { title: "Monitores" }
  }
]