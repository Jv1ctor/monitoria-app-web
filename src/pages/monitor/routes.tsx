import { WelcomeMonitor } from "./WelcomeMonitor";
import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import { MaterialsListPage } from "./pages/materials/MaterialsList";
import { LessonsPage } from "./pages/lessons/LessonsPage";
import { AttendanceFrequencyPage } from "./AttendanceFrequency";

export const monitorRoutes = [
  { index: true, handle: { title: "Inicio" }, element: <WelcomeMonitor /> },
  {
    path: "materials",
    element: <MaterialsListPage />,
  },
  {
    path: "lessons",
    element: <LessonsPage />,
  },
  {
    path: "attendance/:lessonId",
    element: <AttendanceFrequencyPage />,
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
