import { ForumListPage } from "../forum/ForumList"
import { ForumTopicPage } from "../forum/ForumTopic"
import { AvailableMonitoringsPage } from "./pages/availableMonitoring/AvailableMonitorings"
import RatingTeachingAssistant from "./pages/ratingTeacher/RatingTeachingAssistant"
import { SpecificMonitoringPage } from "./pages/specificMonitoring/SpecificMonitoring"
import { StudentAttendancePage } from "./pages/attendance/StudentAttendance"
import { WelcomeStudent } from "./WelcomeStudent"

export const studentRoutes = [
  { index: true, element: <WelcomeStudent /> },
  {
    path: "monitoring",
    element: <AvailableMonitoringsPage />,
  },
  {
    path: "monitoring/:id",
    element: <SpecificMonitoringPage />,
  },

  {
    path: "my-monitoring",
    element: <></> // TODO: CRIAR COMPONENTE
  },

  {
    path: "materials/:id",
    element: <RatingTeachingAssistant />,
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
  },
]
