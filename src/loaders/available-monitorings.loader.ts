import { getClasses } from "@/services/class.service";

export type AvailableMonitoringItem = {
  id: number;
  code: string;
  subjectName: string;
  monitorName: string;
  monitorId: number;
};

export type AvailableMonitoringsLoaderResult = {
  monitorings: AvailableMonitoringItem[];
};

export const availableMonitoringsLoader = async (): Promise<AvailableMonitoringsLoaderResult> => {
  const classes = await getClasses().catch(() => []);

  const monitorings: AvailableMonitoringItem[] = classes.map((cls) => ({
    id: cls.id,
    code: cls.code,
    subjectName: cls.subject?.name ?? "Desconhecida",
    monitorName: cls.monitor
      ? `${cls.monitor.first_name} ${cls.monitor.last_name}`
      : "Sem monitor",
    monitorId: cls.monitor_id,
  }));

  return { monitorings };
};
