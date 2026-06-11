import type { NavItem } from "@/components/layout/auth-layout";
import { paths } from "@/routes/paths";
import { AvailableMonitoringsPage } from "./pages/availableMonitoring/AvailableMonitorings";
import RatingTeachingAssistant from "./pages/ratingTeacher/RatingTeachingAssistant";
import { SpecificMonitoringPage } from "./pages/specificMonitoring/SpecificMonitoring";
import { StudentAttendancePage } from "./pages/frequencyStudent/StudentAttendance";
import { WelcomeStudent } from "./WelcomeStudent";

export const studentNavs: NavItem[] = [
  { label: "Início", path: paths.student },
  { label: "Buscar Disciplina", path: paths.studentSearch },
  { label: "Minhas Monitorias", path: paths.studentMonitorings },
  { label: "Frequência", path: paths.studentFrequency },
];

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
    path: "studentAttendance",
    element: <StudentAttendancePage />,
  },
]
