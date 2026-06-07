import { createBrowserRouter, Navigate } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { PublicLayout } from "./components/layout/public-layout"
import { PublicPage } from "./pages/PublicPage/PublicPage"
import { Layout } from "./components/layout/auth-layout"
import { LoginPage } from "./pages/auth/Login"
import { RegisterPage } from "./pages/auth/Register"
import { RecoverPasswordPage } from "./pages/auth/RecoverPassword"
import { studentLoader } from "./loader/student.loader"
import { monitorLoader } from "./loader/monitor.loader"
import { adminLoader } from "./loader/admin.loader"
import { studentRoutes } from "./pages/student/routes"
import { monitorRoutes } from "./pages/monitor/routes"
import { adminRoutes } from "./pages/admin/routes"
import { MonitorSchedulePage } from "@/pages/schedule/MonitorSchedule"
import { AvailableMonitoringsPage } from "@/pages/student/AvailableMonitorings"

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <PublicPage /> }],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/recover",
    element: <RecoverPasswordPage />,
  },
  {
    path: "/student",
    element: <Layout />,
    loader: studentLoader,
    children: [...studentRoutes]
  },
  {
    path: "/monitor",
    element: <Layout />,
    loader: monitorLoader,
    children: [...monitorRoutes]
  },
  {
    path: "/admin",
    element: <Layout />,
    loader: adminLoader,
    children: [...adminRoutes]
  },
  {
    path: "/ds",
    element: <DesignSystem />,
  },
  {
    path: "/monitorSchedule",
    element: <MonitorSchedulePage />
  },

  {
    path: "availableMonitorings",
    element: <AvailableMonitoringsPage />,
  },
  
])
