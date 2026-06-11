import { createBrowserRouter, Navigate } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { PublicLayout } from "./components/layout/public-layout"
import { PublicPage } from "./pages/PublicPage/PublicPage"
import { Layout } from "./components/layout/auth-layout"
import { LoginPage } from "./pages/auth/Login"
import { RegisterPage } from "./pages/auth/Register"
import { studentRoutes } from "./pages/student/routes"
import { monitorRoutes } from "./pages/monitor/routes"
import { adminRoutes } from "./pages/admin/routes"
import { guestGuardMiddleware } from "./middleware/guestGuard.middleware"
import { roleGuardMiddleware } from "./middleware/roleGuard.middleware"
import { majorLoader } from "./loaders/major.loader"
import { SpinnerFallback } from "./components/shared/SpinnerFallback"
import { authLoader } from "./loaders/auth.loader"

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
    middleware: [guestGuardMiddleware],
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: majorLoader,
    hydrateFallbackElement: <SpinnerFallback />,
    middleware: [guestGuardMiddleware],
  },
  {
    path: "/student",
    element: <Layout />,
    loader: authLoader,
    middleware: [roleGuardMiddleware(["student"])],
    children: [...studentRoutes],
  },
  {
    path: "/monitor",
    element: <Layout />,
    loader: authLoader,
    middleware: [roleGuardMiddleware(["monitor"])],
    children: [...monitorRoutes],
  },
  {
    path: "/admin",
    element: <Layout />,
    loader: authLoader,
    children: [...adminRoutes],
  },
  {
    path: "/ds",
    element: <DesignSystem />,
  },
])
