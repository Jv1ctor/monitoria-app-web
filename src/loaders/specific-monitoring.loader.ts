import { getEnrolledLessons, getLessonsByClass } from "@/services/lesson.service";
import type { LessonResponseDto } from "@/types/lesson.type";

export type SpecificMonitoringLoaderResult = {
  lessons: LessonResponseDto[];
  enrolledLessonIds: number[];
};

export const specificMonitoringLoader = async ({
  params,
}: {
  params: { id?: string };
}): Promise<SpecificMonitoringLoaderResult> => {
  const classId = Number(params.id);
  if (Number.isNaN(classId)) {
    throw new Error("ID da turma inválido.");
  }

  const [lessons, enrolled] = await Promise.all([
    getLessonsByClass(classId).catch(() => [] as LessonResponseDto[]),
    getEnrolledLessons().catch(() => [] as LessonResponseDto[]),
  ]);

  const enrolledLessonIds = enrolled.map((l) => l.id);

  return { lessons, enrolledLessonIds };
};
