import { createBrowserRouter, Navigate } from "react-router"
import { PublicLayout } from "./components/layout/public-layout"
import { PublicPage } from "./pages/PublicPage/PublicPage"
import { Layout } from "./components/layout/auth-layout"
import { LoginPage } from "./pages/auth/Login"
import { RegisterPage } from "./pages/auth/Register"
import { RecoverPasswordPage } from "./pages/auth/RecoverPassword"
import { authLoader } from "./loader/auth.loader"
import { studentRoutes, studentNavs } from "./pages/student/routes"
import { monitorRoutes, monitorNavs } from "./pages/monitor/routes"
import { adminRoutes, adminNavs } from "./pages/admin/routes"
import { guestGuardMiddleware } from "./middleware/guestGuard.middleware"
import { majorLoader } from "./loader/major.loader"
import { SpinnerFallback } from "./components/shared/SpinnerFallback"

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
    path: "/recover",
    element: <RecoverPasswordPage />,
  },
  {
    path: "/student",
    element: <Layout navs={studentNavs} />,
    loader: authLoader,
    children: [...studentRoutes],
  },
  {
    path: "/monitor",
    element: <Layout navs={monitorNavs} />,
    loader: authLoader,
    children: [...monitorRoutes],
  },
  {
    path: "/admin",
    element: <Layout navs={adminNavs} />,
    loader: authLoader,
    children: [...adminRoutes],
  },
])
