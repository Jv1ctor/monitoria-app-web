import { ForumListPage } from "../forum/ForumList"
import { ForumTopicPage } from "../forum/ForumTopic"
import { AvailableMonitoringsPage } from "./pages/availableMonitoring/AvailableMonitorings"
import RatingTeachingAssistant from "./pages/ratingTeacher/RatingTeachingAssistant"
import { SpecificMonitoringPage } from "./pages/specificMonitoring/SpecificMonitoring"
import { StudentAttendancePage } from "./pages/attendance/StudentAttendance"
import { WelcomeStudent } from "./WelcomeStudent"
import { MyMonitorings } from "./pages/myMonitoring/MyMonitorings"
import { availableMonitoringsLoader } from "@/loaders/available-monitorings.loader"
import { specificMonitoringLoader } from "@/loaders/specific-monitoring.loader"
import { materialsLoader } from "@/loaders/materials.loader"
import { studentAttendanceLoader } from "@/loaders/student-attendance.loader"
import { myMonitoringsLoader } from "@/loaders/my-monitorings.loader"
import { studentDashboardLoader } from "@/loaders/student-dashboard.loader"

export const studentRoutes = [
  { index: true, element: <WelcomeStudent />, loader: studentDashboardLoader },
  {
    path: "monitoring",
    element: <AvailableMonitoringsPage />,
    loader: availableMonitoringsLoader,
  },
  {
    path: "monitoring/:id",
    element: <SpecificMonitoringPage />,
    loader: specificMonitoringLoader,
  },

  {
    path: "my-monitoring",
    element: <MyMonitorings />,
    loader: myMonitoringsLoader,
  },

  {
    path: "materials/:id",
    element: <RatingTeachingAssistant />,
    loader: materialsLoader,
  },
  {
    path: "forum",
    element: <ForumListPage />,
  },
  {
    path: "forum/:id",
    element: <ForumTopicPage />,
  },
  {
    path: "frequencies",
    element: <StudentAttendancePage />,
    loader: studentAttendanceLoader,
  },
]
