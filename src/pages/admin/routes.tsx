import { WelcomeAdmin } from "./WelcomeAdmin";
import { RouteErrorFallback } from "@/components/shared/RouteErrorFallback";

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
  // {
  //   path: "classroom",
  //   element: <AdminClassroom />,
  //   handle: { title: "Gerenciar Turmas" },
    
  // }
]