import { getEnrolledLessons } from "@/services/lesson.service";
import type { LessonResponseDto } from "@/types/lesson.type";

export type MyMonitoringsLoaderResult = {
  lessons: LessonResponseDto[];
};

export const myMonitoringsLoader = async (): Promise<MyMonitoringsLoaderResult> => {
  const lessons = await getEnrolledLessons();
  return { lessons };
};
