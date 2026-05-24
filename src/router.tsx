import { createBrowserRouter } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { Example } from "./pages/Example"
import { PublicLayout } from "./components/layout/public-layout"
import { LoginPage } from "./pages/auth/Login"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <Example /> }],
    loader: () => console.log("Executa sempre quando carrega uma page"),
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/ds",
    element: <DesignSystem />,
  },
])
