import { getClasses } from "@/services/class.service";
import { getSubjects } from "@/services/subject.service";
import type { AvailableMonitoringItem } from "@/types/student/AvailableMonitoringItem.type";

export type AvailableMonitoringsLoaderResult = {
  monitorings: AvailableMonitoringItem[];
};

export const availableMonitoringsLoader = async (): Promise<AvailableMonitoringsLoaderResult> => {
  const [classes, subjects] = await Promise.all([getClasses(), getSubjects()]);

  const subjectMap = new Map(subjects.map((s) => [s.id, s]));

  const monitorings: AvailableMonitoringItem[] = classes.map((cls) => {
    const subject = subjectMap.get(cls.subject_id);
    return {
      id: cls.id,
      code: cls.code,
      subjectName: subject?.name ?? "Desconhecida",
      monitorId: cls.monitor_id,
      monitorsCount: 1,
    };
  });

  return { monitorings };
};
