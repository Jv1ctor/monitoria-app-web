import { WelcomeMonitor } from "./WelcomeMonitor";
import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import { MaterialsListPage } from "../monitor/pages/materials/MaterialsList";
import { AvailableMonitoringsPage } from "../student/pages/availableMonitoring/AvailableMonitorings";

export const monitorRoutes = [
  { index: true, handle: { title: "Inicio" }, element: <WelcomeMonitor /> },
  {
    path: "materials",
    element: <MaterialsListPage />,
  },
  {
    path: "availableMonitorings",
    element: <AvailableMonitoringsPage />,
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
