import { createBrowserRouter } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { PublicLayout } from "./components/layout/public-layout"
import { PublicPage } from "./pages/PublicPage/PublicPage"
import Dashboard from "./pages/student/Dashboard"
import { DashboardLayout } from "./components/layout/dashboard-layout"
import { LoginPage } from "./pages/auth/Login"
import { RegisterPage } from "./pages/auth/Register"
import { RecoverPasswordPage } from "./pages/auth/RecoverPassword"
import { ForumListPage } from "./pages/forum/ForumList"
import { ForumTopicPage } from "./pages/forum/ForumTopic"
import RatingTeachingAssistant from "./pages/student/RatingTeachingAssistant"

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
    path: "/forum",
    element: <ForumListPage />,
  },
  {
    path: "/forum/:id",
    element: <ForumTopicPage />,
  },
  {
    path: "/ds",
    element: <DesignSystem />,
  },
  {
    path: "/student",
    element: <DashboardLayout />,
    children: [{ path: "dashboard", index: true, element: <Dashboard /> }],
  },
  {
    path: "/student",
    element: <DashboardLayout />,
    children: [{ path: "subject", index: true, element: <RatingTeachingAssistant /> }],
  },
])
