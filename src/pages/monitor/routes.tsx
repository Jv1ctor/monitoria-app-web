import type { NavItem } from "@/components/layout/auth-layout";
import { paths } from "@/routes/paths";
import { WelcomeMonitor } from "./WelcomeMonitor";
import { MaterialsListPage } from "./pages/materials/MaterialsList";
import { MonitorSchedulePage } from "./pages/schedule/MonitorSchedule";
import { AttendanceFrequencyPage } from "./pages/frequency/AttendanceFrequency";

export const monitorNavs: NavItem[] = [
  { label: "Início", path: paths.monitor },
  { label: "Materiais", path: paths.monitorMaterials },
  { label: "Minhas Monitorias", path: paths.monitorSchedule },
  { label: "Registrar Frequencia", path: paths.monitorFrequency },
];

export const monitorRoutes = [
  { index: true, handle: { title: "Inicio" }, element: <WelcomeMonitor /> },
  {
    path: "materials",
    element: <MaterialsListPage />,
  },
  {
    path: "monitorSchedule",
    element: <MonitorSchedulePage />
  },
  {
    path: "registerFrequency",
    element: <AttendanceFrequencyPage />
  },
]
