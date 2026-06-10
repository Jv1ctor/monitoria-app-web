import { WelcomeAdmin } from "./WelcomeAdmin";

export const adminRoutes = [
  { index: true, handle: { title: "Início" }, element: <WelcomeAdmin /> },
  // Novas rotas de admin aqui
  //EX:
  // {
  //   path: "rota (monitor)",
  //   element: <Pagina />,
  // },
]