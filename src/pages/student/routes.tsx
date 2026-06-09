import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import { AvailableMonitoringsPage } from "./pages/availableMonitoring/AvailableMonitorings";
import RatingTeachingAssistant from "./pages/ratingTeacher/RatingTeachingAssistant";
import { SpecificMonitoringPage } from "./pages/specificMonitoring/SpecificMonitoring";
import { WelcomeStudent } from "./WelcomeStudent";
import { studentLoader } from "@/loader/student.loader";

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
  // {
  //   path: "frequencies",
  //   element: <FrequencyStudent />,
  // },
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
