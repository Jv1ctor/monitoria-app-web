import { getMe } from "@/services/user.service";
import { getFrequenciesByStudent } from "@/services/frequencys.service";
import { getLessonById } from "@/services/lesson.service";
import type { FrequencysResponseDto } from "@/types/frequencys.type";
import type { MeResponse } from "@/types/user.type";
import type { LessonResponseDto } from "@/types/lesson.type";

export type StudentAttendanceLoaderResult = {
  me: MeResponse;
  frequencies: FrequencysResponseDto[];
  lessonsById: Record<number, LessonResponseDto>;
};

export const studentAttendanceLoader = async (): Promise<StudentAttendanceLoaderResult> => {
  const me = await getMe();
  const frequencies = await getFrequenciesByStudent(me.id);
  const lessonIds = [...new Set(frequencies.map(f => f.lesson_id))];
  const lessons = await Promise.all(lessonIds.map(id => getLessonById(id)));
  const lessonsById: Record<number, LessonResponseDto> = {};
  for (const lesson of lessons) {
    lessonsById[lesson.id] = lesson;
  }
  return { me, frequencies, lessonsById };
};
