import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import { MonitorSchedulePage } from "../monitor/pages/schedule/MonitorSchedule";
import { AvailableMonitoringsPage } from "./pages/availableMonitoring/AvailableMonitorings";
import Dashboard from "./pages/dashboard/Dashboard";
import RatingTeachingAssistant from "./pages/ratingTeacher/RatingTeachingAssistant";
import { SpecificMonitoringPage } from "./pages/specificMonitoring/SpecificMonitoring";
import { WelcomeStudent } from "./WelcomeStudent";
import { studentLoader } from "@/loader/student.loader";

export const studentRoutes = [
  { index: true, element: <WelcomeStudent /> },
  {
    path: "frequency",
    element: <RatingTeachingAssistant />,
  },
  {
    path: "availableMonitorings",
    element: <AvailableMonitoringsPage />,
  },
  {
    path: "specificMonitoring",
    element: <SpecificMonitoringPage />,
  },
  {
    path: "materials",
    element: <RatingTeachingAssistant />,
  },
  {
    path: "forum",
    loader: studentLoader,
    element: <ForumListPage />,
  },
  {
    path: "forum/:id",
    loader: studentLoader,
    element: <ForumTopicPage />,
  },
]
