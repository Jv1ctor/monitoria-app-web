import { redirect } from "react-router";
import { getMe } from "@/services/user.service";
import { getLessonById } from "@/services/lesson.service";
import { getFrequenciesByLesson } from "@/services/frequencys.service";
import { paths } from "@/routes/paths";
import type { MeResponse } from "@/types/user.type";
import type { LessonResponseDto } from "@/types/lesson.type";
import type { FrequencysResponseDto } from "@/types/frequencys.type";

export type MonitorAttendanceLoaderResult = {
  me: MeResponse;
  lesson: LessonResponseDto;
  frequencies: FrequencysResponseDto[];
};

type LoaderParams = { params: { lessonId?: string } };

export const monitorAttendanceLoader = async ({
  params,
}: LoaderParams): Promise<MonitorAttendanceLoaderResult> => {
  const lessonIdStr = params.lessonId ?? "";
  const lessonId = Number(lessonIdStr);
  if (!Number.isFinite(lessonId) || lessonId <= 0) {
    throw redirect(paths.monitor);
  }

  const me = await getMe();
  const [lesson, frequencies] = await Promise.all([
    getLessonById(lessonId),
    getFrequenciesByLesson(lessonId).catch(() => []),
  ]);

  const lessonMonitorId = lesson.class?.monitor?.id;
  if (lessonMonitorId !== undefined && lessonMonitorId !== me.id) {
    throw redirect(paths.monitor);
  }

  return { me, lesson, frequencies };
};
