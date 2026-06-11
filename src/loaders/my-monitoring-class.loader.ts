import { getEnrolledLessons } from "@/services/lesson.service";
import type { LessonResponseDto } from "@/types/lesson.type";

export type MyMonitoringClassLoaderResult = {
  classId: number;
  lessons: LessonResponseDto[];
  subjectName: string;
  monitorName: string | undefined;
};

export const myMonitoringClassLoader = async ({
  params,
}: {
  params: { id?: string };
}): Promise<MyMonitoringClassLoaderResult> => {
  const classId = Number(params.id);
  if (Number.isNaN(classId)) {
    throw new Error("ID da turma inválido.");
  }

  const enrolledLessons = await getEnrolledLessons().catch(() => [] as LessonResponseDto[]);
  const lessons = enrolledLessons.filter((l) => l.class_id === classId);

  const firstLesson = lessons[0];
  const subjectName = firstLesson?.class?.subject?.name ?? firstLesson?.modality ?? "Monitoria";
  const monitorName = firstLesson?.class?.monitor
    ? `${firstLesson.class.monitor.first_name} ${firstLesson.class.monitor.last_name}`
    : undefined;

  return { classId, lessons, subjectName, monitorName };
};
