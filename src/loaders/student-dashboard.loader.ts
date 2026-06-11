import { getEnrolledLessons } from "@/services/lesson.service";
import { getMe } from "@/services/user.service";
import { getFrequenciesByStudent } from "@/services/frequencys.service";
import type { LessonResponseDto } from "@/types/lesson.type";
import type { MeResponse } from "@/types/user.type";
import type { FrequencysResponseDto } from "@/types/frequencys.type";

export type StudentDashboardLoaderResult = {
  me: MeResponse;
  enrolledLessons: LessonResponseDto[];
  frequencies: FrequencysResponseDto[];
  stats: {
    totalSessions: number;
    totalPresences: number;
    attendanceRate: number;
    upcomingCount: number;
  };
};

export const studentDashboardLoader = async (): Promise<StudentDashboardLoaderResult> => {
  const me = await getMe();

  const [enrolledLessons, frequencies] = await Promise.all([
    getEnrolledLessons().catch(() => [] as LessonResponseDto[]),
    getFrequenciesByStudent(me.id).catch(() => [] as FrequencysResponseDto[]),
  ]);

  console.log(frequencies)
  const totalSessions = frequencies.length;
  const totalPresences = frequencies.filter((f) => f.value === true).length;
  const attendanceRate =
    totalSessions > 0 ? Math.round((totalPresences / totalSessions) * 100) : 0;
  const upcomingCount = enrolledLessons.filter(
    (l) => new Date(l.date_time) > new Date()
  ).length;

  return {
    me,
    enrolledLessons,
    frequencies,
    stats: {
      totalSessions,
      totalPresences,
      attendanceRate,
      upcomingCount,
    },
  };
};
