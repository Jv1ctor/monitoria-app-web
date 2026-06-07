import { WelcomeMonitor } from "./WelcomeMonitor";
import { ForumListPage } from "../forum/ForumList";
import { ForumTopicPage } from "../forum/ForumTopic";
import { monitorLoader } from "@/loader/monitor.loader";
import { MaterialsListPage } from "./pages/materials/materialsList";

export const monitorRoutes = [
  { index: true, handle: { title: "Inicio" }, element: <WelcomeMonitor /> },
  {
    path: "materials",
    loader: monitorLoader,
    element: <MaterialsListPage />,
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
