import { createBrowserRouter } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { PublicLayout } from "./components/layout/public-layout"
import { PublicPage } from "./pages/PublicPage/PublicPage"
import { LoginPage } from "./pages/auth/Login"
import { RegisterPage } from "./pages/auth/Register"
import { RecoverPasswordPage } from "./pages/auth/RecoverPassword"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <PublicPage /> }],
    loader: () => console.log("Executa sempre quando carrega uma page"),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/recover",
    element: <RecoverPasswordPage/>,
  },
  {
    path: "/ds",
    element: <DesignSystem />,
  },
])
