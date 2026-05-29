import { createBrowserRouter } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { Example } from "./pages/Example"
import { PublicLayout } from "./components/layout/public-layout"
import Dashboard from "./pages/student/Dashboard"
import { DashboardLayout } from "./components/layout/dashboard-layout"
import { LoginPage } from "./pages/auth/Login"
import { RegisterPage } from "./pages/auth/Register"
import { RecoverPasswordPage } from "./pages/auth/RecoverPassword"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <Example /> }],
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
  {
    path: "/student",
    element: <DashboardLayout />,
    children: [{ path: "dashboard", index: true, element: <Dashboard /> }],
  }
])
