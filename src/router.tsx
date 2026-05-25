import { createBrowserRouter } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { PublicLayout } from "./components/layout/public-layout"
import { PublicPage } from "./pages/PublicPage/PublicPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <PublicPage /> }],
    loader: () => console.log("Executa sempre quando carrega uma page"),
  },
  {
    path: "/ds",
    element: <DesignSystem />,
  },
])
