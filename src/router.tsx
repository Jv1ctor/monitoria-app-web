import { createBrowserRouter } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { Example } from "./pages/Example"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Example />,
    loader: () => console.log("Executa sempre quando carrega uma page"),
  },
  {
    path: "/ds",
    element: <DesignSystem />,
  },
])
