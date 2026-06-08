import { WelcomeMonitor } from "./WelcomeMonitor";
import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import { monitorLoader } from "@/loader/monitor.loader";
import { MaterialsListPage } from "../monitor/pages/materials/MaterialsList";
import { AvailableMonitoringsPage } from "../student/pages/availableMonitoring/AvailableMonitorings";

export const monitorRoutes = [
  { index: true, handle: { title: "Inicio" }, element: <WelcomeMonitor /> },
  {
    path: "materials",
    loader: monitorLoader,
    element: <MaterialsListPage />,
  },
  {
    path: "availableMonitorings",
    element: <AvailableMonitoringsPage />,
  },
  {
    path: "forum",
    loader: monitorLoader,
    element: <ForumListPage />,
  },
  {
    path: "forum/:id",
    loader: monitorLoader,
    element: <ForumTopicPage />,
  },
]
