import AdminClassroom from "./AdminClassroom";
import { WelcomeAdmin } from "./WelcomeAdmin";
import { AdminSubjectsPage } from "./pages/AdminSubjectsPage";


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
    path: "AdminSubjects", 
    element: <AdminSubjectsPage />,
    handle: { title: "Disciplinas" }
  }
]