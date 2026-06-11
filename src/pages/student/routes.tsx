import { ForumListPage } from "../forum/ForumList"
import { ForumTopicPage } from "../forum/ForumTopic"
import { AvailableMonitoringsPage } from "./pages/availableMonitoring/AvailableMonitorings"
import RatingTeachingAssistant from "./pages/ratingTeacher/RatingTeachingAssistant"
import { SpecificMonitoringPage } from "./pages/specificMonitoring/SpecificMonitoring"
import { StudentAttendancePage } from "./pages/attendance/StudentAttendance"
import { WelcomeStudent } from "./WelcomeStudent"
import { MyMonitorings } from "./pages/myMonitoring/MyMonitorings"
import { MyMonitoringClassPage } from "./pages/myMonitoring/MyMonitoringClassPage"
import { availableMonitoringsLoader } from "@/loaders/available-monitorings.loader"
import { specificMonitoringLoader } from "@/loaders/specific-monitoring.loader"
import { materialsLoader } from "@/loaders/materials.loader"
import { studentAttendanceLoader } from "@/loaders/student-attendance.loader"
import { myMonitoringsLoader } from "@/loaders/my-monitorings.loader"
import { myMonitoringClassLoader } from "@/loaders/my-monitoring-class.loader"
import { studentDashboardLoader } from "@/loaders/student-dashboard.loader"
import { RouteErrorFallback } from "@/components/shared/RouteErrorFallback"

export const studentRoutes = [
  {
    index: true,
    element: <WelcomeStudent />,
    loader: studentDashboardLoader,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "monitoring",
    element: <AvailableMonitoringsPage />,
    loader: availableMonitoringsLoader,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "monitoring/:id",
    element: <SpecificMonitoringPage />,
    loader: specificMonitoringLoader,
    errorElement: <RouteErrorFallback />,
  },

  {
    path: "my-monitoring",
    element: <MyMonitorings />,
    loader: myMonitoringsLoader,
    errorElement: <RouteErrorFallback />,
  },

  {
    path: "my-monitoring/:id",
    element: <MyMonitoringClassPage/>,
    loader: myMonitoringClassLoader,
    errorElement: <RouteErrorFallback />,
  },

  {
    path: "materials/:id",
    element: <RatingTeachingAssistant />,
    loader: materialsLoader,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "forum",
    element: <ForumListPage />,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "forum/:id",
    element: <ForumTopicPage />,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "frequencies",
    element: <StudentAttendancePage />,
    loader: studentAttendanceLoader,
    errorElement: <RouteErrorFallback />,
  },
]
