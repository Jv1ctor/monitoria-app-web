import { createBrowserRouter } from "react-router"
import { DesignSystem } from "./pages/DesignSystem"
import { PublicLayout } from "./components/layout/public-layout"
import { PublicPage } from "./pages/PublicPage/PublicPage"
import Dashboard from "./pages/student/Dashboard"
import { DashboardLayout } from "./components/layout/dashboard-layout"
import { LoginPage } from "./pages/auth/Login"
import { RegisterPage } from "./pages/auth/Register"
import { RecoverPasswordPage } from "./pages/auth/RecoverPassword"
import DashboardTeaching from "./pages/teachingAssistant/DashboardTeaching"
import { ForumListPage } from "./pages/forum/ForumList"
import { ForumTopicPage } from "./pages/forum/ForumTopic"
import RatingTeachingAssistant from "./pages/student/RatingTeachingAssistant"
import { MonitorSchedulePage } from "@/pages/schedule/MonitorSchedule"
import { MaterialsListPage } from "./pages/materials/materialsList"
import { AvailableMonitoringsPage } from "@/pages/student/AvailableMonitorings"
import { SpecificMonitoringPage } from "@/pages/student/SpecificMonitoring"
import { StudentAttendancePage } from "./pages/student/StudentAttendance"

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
    path: "/teaching",
    element: <DashboardLayout />,
    children: [{ path: "dashboard", index: true, element: <DashboardTeaching /> }],
  },
  {
    path: "/student",
    element: <DashboardLayout />,
    children: [{ path: "subject", index: true, element: <RatingTeachingAssistant /> }],
  },
  {
    path: "/monitorSchedule",
    element: <MonitorSchedulePage />
  },
  {
    path: "/materials",
    element: <MaterialsListPage />,
  },
  {
    path: "availableMonitorings",
    element: <AvailableMonitoringsPage />,
  },
  {
    path: "/specificMonitoring",
    element: <SpecificMonitoringPage />,
  },
  {
    path: "/studentAttendance",
    element: <StudentAttendancePage />,
  },
])
