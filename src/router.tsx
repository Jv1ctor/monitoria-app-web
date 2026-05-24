import { createBrowserRouter } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { Example } from "./pages/Example"
import { PublicLayout } from "./components/layout/public-layout"
import Dashboard from "./pages/student/Dashboard"
import { DashboardLayout } from "./components/layout/dashboard-layout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <Example /> }],
    loader: () => console.log("Executa sempre quando carrega uma page"),
  },
  {
    path: "/ds",
    element: <DesignSystem />,
  },
  {
    path: "/student/dashboard",
    element: <DashboardLayout />,
    children: [{ index: true, element: <Dashboard /> }],
  }
])
