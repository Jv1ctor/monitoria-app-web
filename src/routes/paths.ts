// As definições de rota continuam em router.tsx e nos routes.tsx de cada papel.
export const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  recover: "/recover",
  designSystem: "/ds",

  student: "/student",
  studentSearch: "/student/availableMonitorings",
  studentMonitorings: "/student/specificMonitoring",
  studentFrequency: "/student/studentAttendance",
  studentMaterials: "/student/materials",

  monitor: "/monitor",
  monitorMaterials: "/monitor/materials",
  monitorSchedule: "/monitor/monitorSchedule",
  monitorFrequency: "/monitor/registerFrequency",

  admin: "/admin",
  adminClassroom: "/admin/classroom",
}

export const studentMaterial = (id: string | number) => `${paths.studentMaterials}/${id}`
