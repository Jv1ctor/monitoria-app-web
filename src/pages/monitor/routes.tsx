import { WelcomeMonitor } from "./WelcomeMonitor";
import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import { MaterialsListPage } from "../monitor/pages/materials/MaterialsList";
import { AvailableMonitoringsPage } from "../student/pages/availableMonitoring/AvailableMonitorings";
import { MonitorSchedulePage } from "./pages/schedule/MonitorSchedule";

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
  {
    path: "/monitorSchedule",
    element: <MonitorSchedulePage />
  },
]
