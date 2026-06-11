import { getMe } from "@/services/user.service";
import { getLessonsByClass } from "@/services/lesson.service";
import type { MeResponse } from "@/types/user.type";
import type { ClassResponseDto } from "@/types/class.type";
import type { LessonResponseDto } from "@/types/lesson.type";

export type ScheduleWithClass = LessonResponseDto & {
  class?: ClassResponseDto;
};

export type MonitorScheduleLoaderResult = {
  me: MeResponse;
  schedules: ScheduleWithClass[];
};

export const monitorScheduleLoader =
  async (): Promise<MonitorScheduleLoaderResult> => {
    const me = await getMe();
    const classes: ClassResponseDto[] =
      (me.academicProfile?.classes as ClassResponseDto[] | undefined) ?? [];

    const perClass = await Promise.all(
      classes.map(async (c) => {
        const lessons = await getLessonsByClass(c.id).catch(() => []);
        return { class: c, lessons };
      }),
    );

    const schedules: ScheduleWithClass[] = perClass.flatMap((p) =>
      p.lessons.map((l) => ({ ...l, class: p.class })),
    );
    schedules.sort(
      (a, b) =>
        new Date(a.date_time).getTime() - new Date(b.date_time).getTime(),
    );

    return { me, schedules };
  };
