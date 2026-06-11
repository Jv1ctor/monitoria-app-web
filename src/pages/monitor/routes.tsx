import { WelcomeMonitor } from "./WelcomeMonitor";
import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import { MaterialsListPage } from "./pages/materials/MaterialsList";
import { LessonsPage } from "./pages/lessons/LessonsPage";
import { AttendanceFrequencyPage } from "./AttendanceFrequency";
import { monitorDashboardLoader } from "@/loaders/monitor-dashboard.loader";
import { monitorLessonsLoader } from "@/loaders/monitor-lessons.loader";
import { monitorMaterialsLoader } from "@/loaders/monitor-materials.loader";
import { monitorAttendanceLoader } from "@/loaders/monitor-attendance.loader";
import { RouteErrorFallback } from "@/components/shared/RouteErrorFallback";

export const monitorRoutes = [
  {
    index: true,
    handle: { title: "Inicio" },
    element: <WelcomeMonitor />,
    loader: monitorDashboardLoader,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "materials",
    element: <MaterialsListPage />,
    loader: monitorMaterialsLoader,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "lessons",
    element: <LessonsPage />,
    loader: monitorLessonsLoader,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "attendance/:lessonId",
    element: <AttendanceFrequencyPage />,
    loader: monitorAttendanceLoader,
    errorElement: <RouteErrorFallback />,
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
