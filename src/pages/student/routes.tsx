import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import { AvailableMonitoringsPage } from "./pages/availableMonitoring/AvailableMonitorings";
import RatingTeachingAssistant from "./pages/ratingTeacher/RatingTeachingAssistant";
import { SpecificMonitoringPage } from "./pages/specificMonitoring/SpecificMonitoring";
import { StudentAttendancePage } from "./StudentAttendance";
import { WelcomeStudent } from "./WelcomeStudent";

export const studentRoutes = [
  { index: true, element: <WelcomeStudent /> },
  {
    path: "availableMonitorings",
    element: <AvailableMonitoringsPage />,
  },
  {
    path: "specificMonitoring",
    element: <SpecificMonitoringPage />,
  },
  {
    path: "materials/:id",
    element: <RatingTeachingAssistant />,
  },
  {
    path: "/studentAttendance",
    element: <StudentAttendancePage />,
  },
  {
    path: "forum",
    element: <ForumListPage />,
  },
  {
    path: "forum/:id",
    element: <ForumTopicPage />,
  },
]
